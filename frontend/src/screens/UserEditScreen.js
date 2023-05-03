import {React, useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const UserEditScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
  

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const userId = params.id

    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails
 
    const redirect = navigate.search ? navigate.search.split('=')[1] : '/'

    useEffect(() => {
        if(!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        
    }, [user, dispatch, userId ])


    const submitHandler = (e) => {
        e.preventDefault()
        
    }

  return (
  
            <>
            <Link to='/admin/userlist' className='btn btn-light my-3'> 
            Go back 
            </Link>  
            <FormContainer>
      <h1>Edit User</h1>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='idadmin'>
          <Form.Check
            type='checkbox'
            label='Is Admin'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>


        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
      )}

      
    </FormContainer>
            </>
   
  )
}

export default UserEditScreen