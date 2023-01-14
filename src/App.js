import React from 'react'

import './index.css'
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import Categories from './components/Categories'
import Products from './components/Products'
// import NewsLetter from './components/NewsLetter'
import Register from './pages/Register'
import Footer from './components/Footer'
import Product from './pages/Product'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Router, Routes, Route,  Navigate, Link, useNavigate,} from 'react-router-dom'
import CategoryItem from './components/CategoryItem'
import { useEffect } from 'react'
import ProductList from './components/ProductList'
import Pay from './pages/stripe/Pay'
import ProductDisplay from './pages/stripe/Pay'
import Success from './pages/Success'
import { useSelector } from 'react-redux'
import Notification from './components/notifications/Notification'


const App = () => {
  let Navigate = useNavigate()
const user = useSelector(state => state.user.currentUser)


// useEffect(() => {
// user ? Navigate('/') : <Login/>
// }, [user])
  return (
  <>
<div className="app relative">
<div className='fixed top-0 z-50 left-[25%]  bg-white'> <Notification/></div>
   <div className="navbar z-40  bg-white flex px-2 sm:px-4 md:px-8 fixed top-0 shadow-sm justify-center  shadow-[#ccc]   h-14 w-full ">
   <Navbar/>
   </div>
 <div className='mt-10 py-4 z[2] max-w-[1400px] mx-auto min-h-[100vh]'>

  <Routes>
 <Route path='/'  element={<Home/>}/>
<Route path='/products' element={<ProductList/>} />
 <Route path='/products/:category' element={<ProductList/>}/>
 <Route path='/product/:id' element={<Product/>}/>
 <Route path='/products/:category/:id' element={<Product/>}/>
 <Route path='/cart'  element={<Cart/>}/>
 {/* <Route path='/login'>{user ? Navigate('/') : <Login/>}</Route>  */}
 <Route path='/register' element={<Register/>}/>
 <Route path='/checkout' element={<Pay/>}/>
 <Route path='/checkout/success' element={<Success/>}/>
    </Routes>
 

 </div>
<div className='bg-green-dark'> <Footer/></div>
</div>
  </>
  )
}

export default App