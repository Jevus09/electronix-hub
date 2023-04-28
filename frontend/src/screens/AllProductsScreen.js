import {React, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Categories from '../components/Categories'
import Banner from '../components/Banner'

const AllProductsScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products } = productList

  useEffect(() =>{
    dispatch(listProducts())     
      
  }, [dispatch])


  return (
    <>
    <div style={{ display:'grid', alignItems:'center', justifyContent:'center', margin: '10vh 0 '}}>
    <h1 style={{ display:'grid', alignItems:'center', justifyContent:'center'}}>All Products</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'  >{error}</Message>: 
    <Row >
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4}  xl={3} >
                <Product product={product} />
            </Col>
        ))}
    </Row> }
    </div>
    </>
  )
}

export default AllProductsScreen