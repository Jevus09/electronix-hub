import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import acc from '../images/banner.jpg'
import { Link } from 'react-router-dom'

const AllItems = () => {
  return (
    <div
      style={{ display: 'flex', backgroundColor: '#e9e9e9', margin: '10vh 0' }}
    >
      <Col md={8}>
        <Card className='bg-dark text-white ' border='light'>
          <Card.Img className='d-none d-md-block' src={acc} alt='Card image' />
        </Card>
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <Card
          className='text-center border-0'
          style={{ display: 'flex', width: 'auto', backgroundColor: '#e9e9e9' }}
        >
          <Card.Body>
            <Card.Title
              style={{
                color: 'black',
                fontWeight:'900',
                paddingBottom: '2.5vh',
                fontSize: '1.5vh',
              }}
            >
              Upgrade Your Tech Game with Us
            </Card.Title>
            <Card.Text style={{ paddingBottom: '2.5vh' }}>
              Explore the world of technology with our collection of
              cutting-edge gadgets and innovative solutions. Browse our complete
              selection and upgrade your tech game today.
            </Card.Text>
            <Link to='/items'>
              <Button
                className='btn btn-outline-light border border-primary'
                variant='primary'
                type='button'
              >
                SHOP NOW
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}

export default AllItems
