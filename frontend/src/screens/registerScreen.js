import {React, useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister
 
    const redirect = navigate.search ? navigate.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
        dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler} className='pb-3' >
        <Form.Group controlId='name' >
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name' value={name}
            onChange={(e) => setName(e.target.value)} required >
                
            </Form.Control>
            </Form.Group>



            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email}
            onChange={(e) => setEmail(e.target.value)} required>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password}
            onChange={(e) => setPassword(e.target.value)} required>                
            </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}required>                
            </Form.Control>
            </Form.Group>


        </Form>
        <Button type='submit' variant='primary'>
                Register
            </Button>
        <Row className='py-3' >
            <Col>
            Have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login</Link> 
            </Col>

        </Row>


        </FormContainer>
  )
}

export default RegisterScreen