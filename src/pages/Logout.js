import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closeModal } from '../redux/modalSlice'
import { logoutSuccess } from '../redux/userSlice'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

const handleLogout = () => {
dispatch(logoutSuccess())
navigate('/')
}
  return (
    <div>
        <div className='grid gap-3 place-items-center py-10'>
            <h2 className='font-[500]'>Please confirm</h2>
       <div className='flex gap-4'><button className='bg-yellow-dark text-white px-3 rounded-sm py-1' onClick={() => handleLogout()}>Logout</button> <button className='bg-lime-dark rounded-sm text-white px-3 py-1' onClick={() => navigate('/')}>Cancel</button></div>
        </div>
    </div>
  )
}

export default Logout