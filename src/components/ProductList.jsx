import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Products from './Products'
const ProductList = () => {
  const location = useLocation()
 const category = location.pathname.split('/')[2]
const[filters, setFilter] = useState({})

const [sort, setSort] = useState('newest')

useEffect(() => {
  window.scrollTo(0, 0)
}, [])

const handleFilter = (e) => {
  setFilter({...filters,
    [e.target.name] : e.target.value
  })
}

const handleSort = (e)=> {
  setSort(e.target.value)
}

  return (
  <><div className='p-4 mt-4 grid gap-4 sm:flex justify-between items-center'>
    <div className='flex gap-2 '>
      <h2>Filter Products </h2>
      <select className='border-gray border-[1px] rounded-sm' name='color' onChange={handleFilter}  >
        <option value='' >Color</option>
        <option value="red">Red</option>
        <option value="black">Black</option>
        <option value="yellow">Yellow</option>
      </select>
      <select className='border-gray border-[1px] rounded-sm' name='size' onChange={handleFilter} >
        <option value="">Size</option>
        <option value="L">L</option>

        <option value="XL">XL</option>
        <option value="XXl">XXL</option>
      </select>
    </div>
    <div className='flex gap-4'>
      <h2>Sort Products</h2>
      <select className='border-gray border-[1px] rounded-sm' name='price' onChange={handleSort }>
        <option value="newest">Newest</option>
        <option value="asc">Price(Asc)</option>

        <option value="desc">Price(Desc)</option>
      </select>
    </div>
  </div>
     <Products
    
       category={category}
        filters={filters}
         sort={sort}/>
    
   {/* </div> */}
  </>
  )
}

export default ProductList