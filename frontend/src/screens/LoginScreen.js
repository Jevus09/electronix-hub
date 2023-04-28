import {React, useState, useEffect, useDebugValue} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'






const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
 
    const redirect = navigate.search ? navigate.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }






  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler} className='pb-3'>
            <Form.Group controlId='email' className='pb-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='emial' placeholder='Enter email' value={email}
            onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password}
            onChange={(e) => setPassword(e.target.value)}>                
            </Form.Control>
            </Form.Group>


        </Form>
        <Button type='submit' variant='primary' className=''>
                Sign In
            </Button>
        <Row className='py-3' >
            <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link> 
            </Col>

        </Row>


        </FormContainer>
  )
}

export default LoginScreen