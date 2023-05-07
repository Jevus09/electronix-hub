import { React, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';

const AllProductsScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { pageNumber } = params || 1

  const { keyword } = params;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
        <div style={{ display: 'grid', gridArea: 'auto' }}>
          <SearchBox />
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
            <h1>Products</h1>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <Row>
            {products && products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={products.length === 1 ? 12 : 3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
                  <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}  />
                  </>
        )}
      </div>
    </>
  );
};

export default AllProductsScreen;