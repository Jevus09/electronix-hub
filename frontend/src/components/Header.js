import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer  } from 'react-router-bootstrap'
import {Container, Nav, NavDropdown, Navbar} from 'react-bootstrap'
import { logout } from '../actions/userActions'
import {BiDesktop} from 'react-icons/bi'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logouHandler = () =>{
    dispatch(logout())

  }


  return (
    <header>
        <Navbar className='p-4' bg="" variant=''  expand="lg" collapseOnSelect style={{display:'flex', top: 0, zIndex: 999, width: '100%', backgroundColor:'white'}} >
      <Container >
        <LinkContainer to="/">
        <Navbar.Brand ><BiDesktop style={{fontSize: '1.5vw'}}/>ElectronixHub</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/'> 
            <Nav.Link  ><i class="fa-sharp fa-solid fa-house"></i>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/products'> 
            <Nav.Link  ><i class="fa-sharp fa-solid fa-tablet"></i> Products</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
            <Nav.Link><i className='fas fa-shopping-cart' ></i> Cart</Nav.Link>
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