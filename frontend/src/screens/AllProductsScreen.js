import { React, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const AllProductsScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10vh 0 ',
        }}
      >
        <div style={{ display: 'grid', gridArea:'auto' }} >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <Link
              className='btn btn-outline-dark my-3'
              onClick={() => window.history.back()}
              style={{ marginRight: '1rem' }}
            >
              Go back
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 >Products</h1>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default AllProductsScreen;