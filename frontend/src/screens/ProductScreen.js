import {React, useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const params = useParams()
    const [product, setProduct] = useState({})



    useEffect(() =>{
      const fetchProduct = async () => {
        const {data} = await axios.get(`/api/products/${params.id}`)
        setProduct(data)
      }
      fetchProduct()
    }, [params.id])

  return (
    <>
      <Link className='btn btn-outline-dark my-3' to='/'>
        Go back
      </Link>
      <Row>
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
              </ListGroupItem>
              <ListGroupItem style={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                <Button 
                    className="btn btn-lg btn-dark"
                    type='button' 
                    disabled={product.countInStock  === 0}   >
                    Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen