import React from 'react'
import {BsArrowRightCircleFill} from 'react-icons/bs'
const NewsLetter = () => {
  return (
   <div className='mb-4 text-white   w-full flex flex-col gap-4 items-center   p-4 '>
    <h2 className='text-3xl  font-bold space-x-1'>Newsletter</h2>
    <p>Get timely updates from your favorite products.</p>
   <div className='flex  items-center justify-center w-full h-10'>
   <input type="text" placeholder='Enter your email' className='h-full max-w-[400px] w-full  px-4' />
 <BsArrowRightCircleFill className='text-2xl  w-10  p-1 text-black bg-white h-full'/>
   </div>
   </div>
  )
}

export default NewsLetter