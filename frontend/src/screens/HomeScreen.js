import {React, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import Meta from '../components/Meta'


const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading, error, products } = productList

  useEffect(() =>{
    dispatch(listProducts())     
      
  }, [dispatch])

  // Randomly shuffle the products array
  const shuffledProducts = products ? [...products].sort(() => 0.5 - Math.random()) : [];

  return (
    <>
    <Meta />
    <Carousel />
    <Categories/>
    <div style={{ display:'grid', alignItems:'center', justifyContent:'center', margin: '10vh 0 '}}>
    <h1 style={{ display:'grid', alignItems:'center', justifyContent:'center'}}>Featured Products</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'  >{error}</Message>: 
    <Row >
        {shuffledProducts.slice(0, 4).map(product => (
            <Col style={{ height: '100%'}} key={product._id} sm={12} md={6} lg={4}  xl={3} >
                <Product product={product} />
            </Col>
        ))}
    </Row> }
    </div>
    <Banner/>
    </>
  )
}

export default HomeScreen