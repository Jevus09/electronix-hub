import {React, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from './Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'


const Accessories = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products } = productList

  useEffect(() =>{
    dispatch(listProducts())     
      
  }, [dispatch])


  return (
    <>
    <div style={{ display:'grid', alignItems:'center', justifyContent:'center', margin: '10vh 0 '}}>
    <h1 style={{ display:'grid', alignItems:'center', justifyContent:'center'}}>Accessories</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'  >{error}</Message>: 
    <Row >
        {products.filter(product => product.category === 'Accessories').map(filteredProduct => (
            <Col key={filteredProduct._id} sm={12} md={6} lg={4}  xl={3} >
                <Product product={filteredProduct} />
            </Col>
        ))}
    </Row> }
    </div>
    </>
  )
}

export default Accessories