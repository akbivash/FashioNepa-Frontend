import React from 'react'
import { useState, useEffect } from 'react'
import { useFetch } from '../customhooks/useFetch'
import Dropdown from './Dropdown'
import Products from './Products'
const ProductList = () => {

  const [filters, setFilter] = useState({})
  const [sort, setSort] = useState('newest')
  const { category } = useFetch()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFilter = (e) => {
    setFilter({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSort = (e) => {
    setSort(e.target.value)
  }
  return (
    <><div className='p-4 mt-4 grid gap-4 sm:flex justify-between items-center relative'>
      <div className='flex gap-2 '>
        <h2>Filter Products </h2>
        <select className='border-gray border-[1px] rounded-sm' name='color' onChange={handleFilter}  >
          <option value='' >Color</option>
          <option value='white' >White</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="yellow">Yellow</option>
        </select>
        <select className='border-gray border-[1px] rounded-sm' name='size' onChange={handleFilter} >
          <option value="">Size</option>
          {category === 'alcohol' ? <> <option value="250ml">250ml</option>

            <option value="500ml">500ml</option> <option value="750ml">750ml</option> </> : <> <option value="L">L</option>

            <option value="XL">XL</option> </>}

        </select>
      </div>
      <div className='flex gap-4'>
        <h2>Sort Products</h2>
        <select className='border-gray border-[1px] rounded-sm' name='price' onChange={handleSort}>
          <option value="newest">Newest</option>
          <option value="asc">Price(Asc)</option>

          <option value="desc">Price(Desc)</option>
        </select>
      </div>
    </div>
      <Products
        filters={filters}
        sort={sort} />

      <div className='dropdown  fixed top-14  z-10'>
        <Dropdown />
      </div>
    </>
  )
}

export default ProductList