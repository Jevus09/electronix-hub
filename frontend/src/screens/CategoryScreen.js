import {React, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'


const CategoryScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const productList = useSelector(state => state.productList)
  const {loading, error, products } = productList

  useEffect(() =>{
    dispatch(listProducts())     
      
  }, [dispatch])


  return (
    <>
    <div style={{ display:'grid', alignItems:'center', justifyContent:'center', margin: '10vh 0 '}}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-betudeween', marginBottom:'50px'}}>
      <Link className='btn btn-outline-dark my-3' to='/'>
        Go back
      </Link>
    <h1 >{(params.id).toUpperCase()}</h1>
    <Link className='btn btn-outline-dark my-3' to='/products'>
        All Products
      </Link>
    </div>
    {loading ? <Loader/> : error ? <Message variant='danger'  >{error}</Message>: 
    <Row equal >
        {products.filter(product => product.category === `${params.id}`).map(filteredProduct => (
            <Col key={filteredProduct._id} sm={12} md={6} lg={4}  xl={3} >
                <Product product={filteredProduct}  />
            </Col>
        ))}
    </Row> }
    </div>
    </>
  )
}

export default CategoryScreen