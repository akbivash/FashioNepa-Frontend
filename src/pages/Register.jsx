import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { registerFailure, registerStart, registerSuccess, setErrorMsg } from '../redux/userSlice'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { publicRequest } from '../requestMethods'
import Modal from '../components/Modal'
import { openModal, closeModal } from '../redux/modalSlice'
import{FaTimes}from 'react-icons/fa'
const Register = () => {

const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

const{isFetching, currentUser,error, errorMsg} = useSelector(state => state.user)
const{isModal} = useSelector(state => state.modal)
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });



  function onSubmit(data){
    const {email, password, username} = data
  const reg =  async () => {
  dispatch(registerStart())
  try {
    const response =    await publicRequest.post('api/v1/auth/register', {email, password, username})
          dispatch(registerSuccess(response))
          navigate('/account')
          
      } catch (err) {
       
        console.log(err.message === 'Network Error')
          dispatch(registerFailure())
        if(err.message === 'Network Error'){
            dispatch(setErrorMsg(err.message ))
        }else{
          dispatch(setErrorMsg(err.response.data.msg ))

        }
            dispatch(openModal())
      }
  }
   reg()
  }

  
  return (
 <div className='grid  place-items-center mt-10 px-10'>
 {currentUser && <span>You are already registered</span>}
 {!currentUser && <> <h2 className='text-2xl font-[400] uppercase mb-4'>Create your account</h2>
 {/* <span className='text-red-default'>{errorMsg}</span> */}

 <form action="" className='form w-full max-w-lg grid gap-3' onSubmit={handleSubmit(onSubmit)}>


        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            type="text"
            {...register('username')}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register('email')}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register('password')}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>


        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
       

        <div className="form-group  form-check">
          <input
            name="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            
          />
          <label htmlFor="acceptTerms" className="form-check-label text-center">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>

  <button className='bg-green-dark px-4 py-1 w-fit mx-auto rounded-sm disabled:opacity-50 text-white' type='submit' disabled={isFetching}>Sign Up</button>
  <button
            type="button"
            onClick={reset}
            className="btn btn-warning float-right"
          >
            Reset
          </button>

        { isModal && <Modal >
<p>{errorMsg}</p>
<button className='text-yellow-default' onClick={() => dispatch(closeModal())}><FaTimes/></button>
          </Modal>}
       
 </form>

  <div className='mt-4'>
    <span>Already have an account ? </span>
    <Link to='/login' className='font-bold  text-green-dark'>Login</Link>
  </div> </>}
 </div>
  )
}

export default Register