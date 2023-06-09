import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [uploading, setUploading] = useState(false)

  const productId = params.id

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        navigate('/admin/productlist')
    } else {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
          } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setImage1(product.image1)
            setImage2(product.image2)
            setImage3(product.image3)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setBrand(product.brand)
          }

    }
    
  }, [dispatch, product, productId, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({_id: productId, name, price, category, brand, image, image1, image2, image3, description, countInStock}))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control type="file" multiple label='Choose File' custom onChange={uploadFileHandler} />

            </Form.Group>

            <Form.Group controlId='image1'>
            <Form.Label>Image1</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image1 URL'
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" multiple label='Choose File' custom onChange={uploadFileHandler} />
            </Form.Group>

            <Form.Group controlId='image2'>
            <Form.Label>Image2</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image2 URL'
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" multiple label='Choose File' custom onChange={uploadFileHandler} />
            </Form.Group>

            <Form.Group controlId='image3'>
            <Form.Label>Image3</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image3 URL'
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" multiple label='Choose File' custom onChange={uploadFileHandler} />
            </Form.Group>

            <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countinstock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count in Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
