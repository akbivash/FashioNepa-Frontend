import React from 'react'

const Logout = () => {
  return (
    <div>
        <div className='grid gap-3 place-items-center p-4'>
            <h2 className='font-[500]'>Please confirm</h2>
       <div className='flex gap-4'><button className='bg-yellow-dark text-white px-3 rounded-sm py-1'>Logout</button> <button className='bg-lime-dark rounded-sm text-white px-3 py-1'>Cancel</button></div>
        </div>
    </div>
  )
}

export default Logout