import React from 'react'
import {Link} from 'react-router-dom'

let inputs = ['username', 'email', 'password', 'confirm password']
const Register = () => {
  return (
 <div className='grid place-items-center mt-10 px-2'>
  <h2 className='text-2xl font-[400] uppercase mb-10'>Create your account</h2>
  {inputs.map(i => {
    return <div className="form_control grid gap-2 w-full max-w-[400px]">
   <label htmlFor="">{i}</label>
   <input type="cpassword" name="" className=' border-[1px] outline-none border-[#ccc] px-3 py-1 rounded-sm' />
   </div>
  })}
  <button className='bg-green-dark text-white px-6 py-2 rounded-md mt-2'>Sign Up</button>
  <div className='mt-4'>
    <span>Already have an account ? </span>
    <Link to='/login' className='font-bold  text-green-dark'>Login</Link>
  </div>
 </div>
  )
}

export default Register