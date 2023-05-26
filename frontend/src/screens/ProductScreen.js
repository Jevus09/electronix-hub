import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  Button,
  Card,
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import Product from '../components/Product'
import Meta from '../components/Meta'

const ProductScreen = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const [qty, setQty] = useState(1)

  const { product } = productDetails

  const [image, setImage] = useState(product?.image)

  const changeImage = (e) => {
    setImage(e.target.src)
  };

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    // reset the image state when a new product is clicked
    setImage(product?.image)
  }, [product])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
  const productList = useSelector((state) => state.productList)

  const { loading, error, products } = productList
  const shuffledProducts = products?.length
    ? [...products].sort(() => 0.5 - Math.random())
    : []

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div style={{ marginTop: '5vh' }}>
      <Link className='btn btn-outline-dark my-3' onClick={() => window.history.back()}>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Meta title={product.name}/>
        <Row>
          <Col md={6}>
            <div>
              <div
                className='pic'
                style={{
                  marginTop: '55px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={image}
                  alt={product.name}
                  fluid
                  style={{ height: '350px', objectFit: 'contain', maxWidth: '380px' }}
                />
              </div>
              <div
                className='d-flex flex-wrap align-items-center'
                style={{ justifyContent: 'space-around', marginTop: '55px'  }}
              >
                <Col xs={4} sm={3} className='mb-3'>
                  <Image onClick={changeImage} src={product.image1} alt={product.name} fluid />
                </Col>
                <Col xs={4} sm={3} className='mb-3'>
                  <Image onClick={changeImage} src={product.image2} alt={product.name} fluid />
                </Col>
                <Col xs={4} sm={3} className='mb-3'>
                  <Image onClick={changeImage} style={{ maxHeight: '350px',  }} src={product.image3} alt={product.name} fluid />
                </Col> 
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div
              className='desc'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '18vw',
                  minWidth: '350px',
                }}
              >
                <ListGroup variant='flush' style={{ width: '100%' }}>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                    {/* ADD QTY OPTION */}
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            size='sm'
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {' '}
                                  {x + 1}{' '}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* ADD TO CART BUTTON */}

                    <Button
                      onClick={addToCartHandler}
                      className='btn btn-outline-light border border-primary'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </div>
          </Col>
        </Row>
        </>
      )}
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '5vh 0 ',
        }}
      >
        <h1 style={{ display: 'grid' }}>Trending Now</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {shuffledProducts.slice(0, 4).map((filteredProduct) => (
              <Col key={filteredProduct._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={filteredProduct} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default ProductScreen
