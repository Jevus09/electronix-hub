import {React, useState, useEffect} from 'react'
import { Link, useParams, useNavigate  } from 'react-router-dom'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
    Button, Card, Col, Row,
    Image, ListGroup, ListGroupItem, FormControl,  
} 
from 'react-bootstrap'





const ProductScreen = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const [qty, setQty] = useState(0)

    const {loading, error, product } = productDetails



    useEffect(() =>{
      dispatch(listProductDetails(params.id))


      }, [dispatch, params.id])


      const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
      }

  return (
    <>
      <Link className='btn btn-outline-dark my-3' to='/'>
        Go back
      </Link>
      {loading ? <Loader/> : error ? <Message variant='danger' >{error}</Message>: 
      (<Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
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
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
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
                    {product.countInStock  > 0 ?'In Stock' : 'Out of Stock'}
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
                              as='select' 
                              value={qty} 
                              onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map(x => (
                                  <option key={x + 1} value={x + 1} > {x +1} </option>
                                ))}
                            </FormControl>
                          </Col>
                        </Row>


                      </ListGroupItem>

                      )}

              <ListGroupItem style={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>

                    {/* ADD TO CART BUTTON */}  

                <Button 
                    onClick={addToCartHandler}
                    className="btn btn-lg btn-dark"
                    type='button' 
                    disabled={product.countInStock  === 0}   >
                    Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>)}
    </>
  )
}

export default ProductScreen
