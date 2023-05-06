import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import headphone from '../images/headphones.jpg'
import camera from '../images/cameras.jpg'
import phone from '../images/phone.jpg'
import pc from '../images/computer.jpg'
import { Link } from 'react-router-dom'

const data = [
  {
    id: 1,
    image: headphone,
    title: 'Headphones',
    link: '/headphones'
  },
  {
    id: 2,
    image: camera,
    title: 'Cameras',
    link: '/cameras'
  },
  {
    id: 3,
    image: phone,
    title: 'Phones',
    link: '/phones'
  },
  {
    id: 4,
    image: pc,
    title: 'Computers',
    link: '/computers'
  },
]

const Categories = () => {
  return (
     <Container fluid="md"style={{margin: '8vh 0 8vh 0 '}} >
      <Row>
        {data.map(({ image, id, title, link }) => (            
          <Col key={id}  md={3} xs={6}
          style={{margin: '5px 0'}}>
            <Link  to={link} >
            <Card className="category-card text-white border-0 " >
                <Card.Img className="img-fluid " src={image} alt="Card image" />
                <Card.ImgOverlay className='d-flex flex-column' >
                  <Card.Title className=' mt-auto'style={{fontWeight: '900' }} >{title}</Card.Title>
                </Card.ImgOverlay>
            </Card>
            </Link>
          </Col>          
        ))}
      </Row>
    </Container>

  )
}

export default Categories
