import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer  } from 'react-router-bootstrap'
import {Container, Nav, NavDropdown, Navbar} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logouHandler = () =>{
    dispatch(logout())

  }


  return (
    <header>
        <Navbar className='p-4' bg="dark" variant='dark'  expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand >ElectronixHub</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart' ></i> Cart</Nav.Link>
            </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logouHandler}>Logout</NavDropdown.Item>
                </NavDropdown>

              ) :
              
              <LinkContainer to="/login" >
              <Nav.Link ><i className='fas fa-user' ></i> Sign in</Nav.Link>
              </LinkContainer>

              }



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header