import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,  } from 'react-router-dom'
import Pay from './stripe/Pay'
import Modal from '../components/Modal'
import { decreaseQuantity, increaseQuantity, removeProduct, resetState } from '../redux/cartSlice'
import { closeModal, openModal } from '../redux/modalSlice'
import { useEffect } from 'react'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const{isModal} = useSelector(state => state.modal)
  const watchlist = cart.watchlist
  const{currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()

useEffect(() => {

  let timeout = setTimeout(() => {
    if(currentUser === null ) 
    dispatch(openModal())
  },[1000])
 

 return () => {
  clearTimeout(timeout)
 }
},[])

const increment = (product) => {
  dispatch(increaseQuantity(product))
}
const decrement = (product) => {
  dispatch(decreaseQuantity(product))
}

const removeItem = (id) =>{
cart.products.map(product => {

  if(product._id === id){
    dispatch(removeProduct({...product}))
  }
})
}
const resetAll = () => {
  dispatch(resetState())
  dispatch(closeModal())
}

  return (
       <div className=' grid gap-4 py-4 '>
     
   {/* top  */}
   <div className="top grid gap-3 place-items-center  sm:flex sm:justify-around">
  <Link to='/products' className='bg-green-dark w-[fit-content] text-white p-2  h-[fit-content] rounded-sm'>CONTINUE SHOPPING</Link>
  <div className='flex gap-7 flex-col justify-center items-center'>
  <h2 className='text-xl sm:text-3xl uppercase text-green-dark'>Your Bag</h2>
  <div className='flex gap-2 sm:gap-10 text-center font-semibold '><span >Shopping Bag({cart.quantity})</span><Link to='/watchlist'>Your Wishlist({watchlist.length})</Link></div>
  </div>
    </div>
  
  {/* bottom */}
  <div className=" grid  lg:flex lg:justify-around gap-4">
  {/* items  */}
   <div className='p-2 max-h-[80vh] cart-scrollbar shadow-lg overflow-y-scroll scrollbar-thumb-gray-900 scrollbar-track-gray-100 grid gap-3 mx-auto w-full '>
   {cart.products.length != 0 && cart.products.map((product, index) => {
      return   <div key={index} className='grid place-items-center md:flex md:justify-around gap-4  p-3 shadow-lg   shadow-[#ccc]'>
         <div className='w-full max-w-[300px]  '><img src={product.img} alt="" className='  w-full  h-[200px]'/></div>
          <div className='grid text-sm place-items-center  xl:text-lg gap-4'>
            <div >  <span>Product </span><span className='cart-product-detail' >{product.title}</span></div>
              <div><span>color </span> {product.color &&  <span  className='font-semibold'>{product.color}</span>} </div>
            <div>  <span>Size</span><span className='cart-product-detail' >{product.size}</span></div>
            {/* <span>{product._id}</span> */}
          </div>
      
  
         <div className='flex gap-7  md:grid place-items-center md:gap-2 '>
   <div className='flex gap-4 items-center'>
     <span className='bg-yellow-dark cursor-pointer w-5 h-1 ' onClick={() => decrement(product)}></span>
     <span className='text-2xl'>{product.quantity}</span>
     <span  className='bg-green-dark cursor-pointer w-5 h-1 relative' onClick={() => increment( product)}>
     <span  className='bg-green-dark w-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-5 absolute'></span>
     </span>
     </div>
     <span className='text-xl my-2 xl:text-2xl'>Rs { product.price * product.quantity}</span>
     <button className='bg-yellow-dark w-fit p-1 px-3 text-white' onClick={() => removeItem(product._id)}>Remove</button>
   </div>
   </div>
  
    })}
    {cart.products.length === 0 && <div className='text-center py-10'>You have no items , Please add first.</div>}
   </div>
  
  {/* order summary  */}
  
  
    {cart.products.length !== 0 &&  <div className='summary w-full  max-w-[350px] grid  shadow-lg shadow-[#ccc] mx-auto gap-7 '>
      <div className=' w-full   p-4'>
          <h2 className='text-2xl text-green-dark'>ORDER SUMMARY</h2>
              <div className='grid gap-2 w-full'>
                  <div className='flex justify-between w-full  '><span>Subtotal</span>  <span>{cart.totalPrice}</span></div>
                  <div  className='flex justify-between w-full  '><span>Estimated Shipping</span>  <span>$ 4</span></div>
                  <div  className='flex justify-between w-full  '><span>Shopping Discount</span><span>$ -4</span></div>
                  <div  className='flex justify-between w-full  '><span className='font-bold'>TOTAL</span><span className='font-bold'>Rs {cart.totalPrice}</span></div>
               <Pay cart={cart}/> 
              </div>
          </div>
      </div>}
  
  </div>
  
  
  {cart.products.length != 0 && <> <button className='bg-yellow-dark w-fit mx-auto p-2 text-white rounded-sm' onClick={() => dispatch(openModal())}>Reset</button>
  {isModal && currentUser && <Modal >
  <span>  <h2>Are you sure ?</h2></span>
  <div className='flex p-2 gap-3'>
    <button className='bg-yellow-dark p-1 px-5 rounded-sm' onClick={resetAll}>yes</button>
    <button  className=' p-1 px-5 bg-white text-black-default rounded-sm' onClick={() => dispatch(closeModal())}>no</button>
  </div>
  </Modal>}
   </>}
  
   {isModal && currentUser === null && <Modal className='fixed'>
            <div className="grid gap-2">
             <span className="flex gap-3 items-center"> Please sign up to add item <img src="https://em-content.zobj.net/source/skype/289/smiling-face-with-smiling-eyes_1f60a.png" alt="" className="h-10 w-10" /></span>
             <span className="flex gap-3 items-center"><Link to='/register' className="bg-green-default py-2 text-[#000] px-7">Ok</Link> <button className="bg-yellow-default text-[#000] px-7 py-2" onClick={() => dispatch(closeModal())}>Cancel</button></span>
            </div>
            </Modal>}
     </div>

  )
}

export default Cart