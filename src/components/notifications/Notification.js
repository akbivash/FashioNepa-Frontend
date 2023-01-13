import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const Notification = () => {
const[showNotification, setShowNotification] = useState(false)
    const notifyRef = useRef()

    useEffect(() => {

let timeoutId = setTimeout(() => {
setShowNotification(true)

return () => {
    clearTimeout(timeoutId)
}
},5000)
    },[])
  return (
    <div>
   {showNotification && <div className='w-full  max-w-[340px] p-4  gap-2 shadow-[0px_4px_10px_rgba(0,0,0,0.6)] bg-white rounded-sm'
   ref={notifyRef}
   >
<h3 className='text-gray-light text-xl font-[500] tracking-wide '>FashioNepa wants to be friend with you</h3>
<p className='text-gray-default'>Become friends with FN to be the first one to know about exclusive deals and discounts.</p>
   <div className='flex justify-between'>
       <button className='bg-yellow-dark px-4 py-2 text-white'
       onClick={() => {
        setShowNotification(false)
       
       }}
       >Not Interested</button>
       <button className='bg-green-dark text-white py-2 px-4'>Be Friends</button>
   </div>
   </div> }
   </div>
  )
}

export default Notification