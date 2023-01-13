import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categories} from '../data'
import Pay from './stripe/Pay'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  return (
    <div className=' grid gap-4 py-4 '>
     
 {/* top  */}
 <div className="top grid gap-3 place-items-center sm:flex sm:justify-around">
<Link to='/products' className='bg-green-dark w-[fit-content] text-white p-2  h-[fit-content] rounded-sm'>CONTINUE SHOPPING</Link>
<div className='flex gap-7 flex-col justify-center items-center'>
<h2 className='text-xl sm:text-3xl uppercase text-green-dark'>Your Bag</h2>
<div className='flex gap-2 sm:gap-10 text-center  '><span>Shopping Bag({cart.products.length})</span><span>Your Wishlist(1)</span></div>
</div>
{/* <Pay  cart={cart} /> */}
  </div>

{/* bottom */}
<div className="lg:flex grid place-items-center items-start lg:justify-around gap-4">
 <div className='p-2 grid gap-3'>
 {cart.products.map((product, index) => {
    return   <div key={index} className='flex  flex-3 flex-col gap-4 md:flex-row sm:gap-10 p-3 shadow-sm   shadow-green-dark'>
       <div className='flex gap-4 md:gap-20 justify-center'>
       <div className='w-full max-w[340px]'><img src={product.img} alt="" className=' object-cover w-full h-[200px]'/></div>
        <div className='grid gap-4'>
          <div >  <span>Product </span><span className='cart-product-detail' >{product.title}</span></div>
       <div>     <span>ID  </span><span className='cart-product-detail' >{product._id}</span></div>
            <div><span>color </span> {product.color && product.color.map(c => {return <span key={c}  className='cart-product-detail'>{c}</span>})} </div>
          <div>  <span>Size</span><span className='cart-product-detail' >{product.size}</span></div>

        </div>
       </div>

       <div className='grid  '>
 <div className='flex gap-5 items-center'>
   <span className='bg-yellow-dark cursor-pointer w-5 h-1 '></span>
   <span className='text-2xl'>{product.quantity}</span>
   <span  className='bg-green-dark cursor-pointer w-5 h-1 relative'>
   <span  className='bg-green-dark w-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-5 absolute'></span>
   </span>
   </div>
   <span className='text-xl sm:text-3xl'>Rs {product.price * product.quantity}</span>
 </div>

    </div>
  })}
  {cart.quantity === 0 && 'You have no items , Please add first.'}
 </div>



   <div className='summary w-full flex-1 max-w-[500px] grid gap-7 place-items-center '>
    <div className=' w-full   shadow-sm shadow-green-dark p-4'>
        <h2 className='text-2xl text-green-dark'>ORDER SUMMARY</h2>
            <div className='grid gap-2 w-full'>
                <div className='flex justify-between w-full  '><span>Subtotal</span>  <span>{cart.totalPrice}</span></div>
                <div  className='flex justify-between w-full  '><span>Estimated Shipping</span>  <span>$ 4</span></div>
                <div  className='flex justify-between w-full  '><span>Shopping Discount</span><span>$ -4</span></div>
                <div  className='flex justify-between w-full  '><span className='font-bold'>TOTAL</span><span className='font-bold'>Rs {cart.totalPrice}</span></div>
             {cart.totalPrice != 0 ?  <Pay cart={cart}/> : ''}
            </div>
        </div>
    </div>
</div>


   </div>

  )
}

export default Cart