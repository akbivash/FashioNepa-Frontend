import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../assets/data'
const CategoryItem = () => {

  return (
    <div  className='w-full  z-10 mb-20 items-center flex flex-wrap justify-center gap-4 md:gap-10 '>
      {categories.map((category, index) => {
        return <Link  to={`${category.cat.replace(/ /g,'')}`} key={category.id}
        className='w-full  h-[320px] rounded-lg overflow-hidden mt-8 max-w-[350px] sm:max-w-[300px]  relative '>
        {/* <div> */}
    <img src={category.img} alt="img" className='w-full h-full bg-black object-cover '/>
  
    <div className='absolute bottom-0 w-full  left-0  bg-[rgba(0,0,0,0.4)] text-white  p-2'>
    <div className='text-2xl w-full font-bold'>{category.title}</div>
      <button className='bg-white text-black-dark p-3'>SHOP NOW</button>
    </div>
     {/* </div> */}
        </Link>
      })}
    </div>
    
  
  )
}

export default CategoryItem