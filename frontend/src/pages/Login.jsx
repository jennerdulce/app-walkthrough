import React from 'react'

import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

// Spinner for loading
import Spinner from '../components/Spinner'

// Bring in Register and Reset Redux Actions that ultimately manipulates Global State when invoked
import { login, reset } from '../features/auth/authSlice'

// useSelector: To use redux global state variables
// useDispatch: To dispatch actions created in Redux
import { useSelector, useDispatch } from 'react-redux'

// Used to redirect users to a different page immediately
import { useNavigate } from 'react-router-dom'

// Used for alerts / error messages
import { toast } from 'react-toastify'

function Login() {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      navigate('/') // Dashboard
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

    if (isLoading) {
      return <Spinner />
    }
  }

  return (
    <>
      <section className='heading'>
        <h1><FaSignInAlt />  Login</h1>
        <p> Login and start creating Items! </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button type="submit" className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login