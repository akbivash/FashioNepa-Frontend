import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { register } from '../redux/apiCalls'
import { registerStart } from '../redux/userSlice'
import { handleFormError } from './handleFormError'



const Register = () => {
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const[error, setError] = useState({
    usernameErr:'',
    emailErr:'',
    passwordErr:'',
    cPasswordErr:''
  })
const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
   
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  handleFormError(user, error, setError)
  }
  return (
 <div className='grid place-items-center mt-10 px-2'>
  <h2 className='text-2xl font-[400] uppercase mb-4'>Create your account</h2>
 <form action="" className='form w-full max-w-xl grid gap-3' onSubmit={handleSubmit}>
  <div>
    <label htmlFor="">username</label>
    <input type="text" name='username' value={user.username} onChange={handleChange}/>
    <span className='text-[red]'>{error.usernameErr}</span>
  </div>
  <div>
    <label htmlFor="">email</label>
    <input type="text" name='email' value={user.email} onChange={handleChange} />
    <span className='text-[red]'>{error.emailErr}</span>

  </div>
  <div>
    <label htmlFor="">password</label>
    <input type="password" name='password' value={user.password} onChange={handleChange}/>
    <span className='text-[red]'>{error.passwordErr}</span>

  </div>
  <div>
    <label htmlFor="">confirmPassword</label>
    <input type="password" name='confirmPassword' value={user.confirmPassword} onChange={handleChange} />
   <span className='text-[red]'> {error.cPasswordErr}</span>
  </div>
  <button className='bg-green-dark px-4 py-1 w-fit mx-auto rounded-sm text-white' type='submit'>Sign Up</button>
 </form>
  <div className='mt-4'>
    <span>Already have an account ? </span>
    <Link to='/login' className='font-bold  text-green-dark'>Login</Link>
  </div>
 </div>
  )
}

export default Register