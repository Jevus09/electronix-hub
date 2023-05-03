import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserAdmin } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userId = params.id

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userAdminUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET })
      navigate('/admin/userlist')
    } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
          }
    }
  }, [user, dispatch, userId, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAdmin({_id: userId, name, email, isAdmin}))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
