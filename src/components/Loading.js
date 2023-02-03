import React from 'react'
import { useFetch } from '../customhooks/useFetch'

const Loading = () => {

  return (
    <div className=" bg-white py-2 z-50 absolute left-[50%] translate-x-[-50%]  w-full mx-auto  ">
    <div className="   w-5 h-5  mx-auto border-l-[#ccc] animate-spin   border-2 border-green-dark rounded-full ">
    
      </div>
     
 </div>
  )
}

export default Loading