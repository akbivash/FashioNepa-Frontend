import React from 'react'

const Modal = ({children}) => {
  return (
   
   <div className='h-fit py-2 px-10 max-h-[200px] grid place-items-center gap-4 w-fit rounded-md  bg-gray-default fixed top-[50%] text-white left-[50%] translate-x-[-50%] translate-y-[-50%] z-[300]   '>
        {children}
    </div>
  
  )
}

export default Modal