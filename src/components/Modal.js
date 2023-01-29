import React from 'react'

const Modal = ({children}) => {
  return (
   
   <div className='h-40 px-10 flex justify-center items-center rounded-md  bg-sky-dark fixed top-[50%] text-white left-[50%] translate-x-[-50%] translate-y-[-50%] z-[300]   '>
        {children}
    </div>
  
  )
}

export default Modal