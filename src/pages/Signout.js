import React from 'react'
import { Link } from 'react-router-dom'

const Signout = () => {
  return (
    <div>
        <div className='grid gap-3 place-items-center p-4'>
            <h2 className='text-xl '>Are you sure to signout ?</h2>
            <div><Link className='bg-yellow-dark text-white cursor-pointer px-3 py-1 rounded-sm'>Yes</Link> <Link to='/' className='bg-lime-dark mx-5 text-white px-3 py-1 rounded-sm cursor-pointer'>No</Link></div>
        </div>
    </div>
  )
}

export default Signout