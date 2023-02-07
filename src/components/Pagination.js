import React, { useState, useEffect } from 'react'
import { useFetch } from '../customhooks/useFetch'


const Pagination = ({ page, setPage, limit}) => {
  const {allProducts} = useFetch()
const totalPages = Math.ceil(allProducts.length / limit)
  const handlePage = (index) => {
    setPage(index)
  }

  return (

    <div className='flex flex-wrap justify-center gap-2 pt-4'>
      {totalPages > 0 && [...Array(totalPages)].map((item, ind) => {

        if (ind + 1 === page) {
          return <button key={ind} className='border-[1px] bg-green-dark text-white border-black px-2' onClick={() => handlePage(ind + 1)}>{ind + 1}</button>

        } else {
          return <button key={ind} className='border-[1px] border-black px-2' onClick={() => {
            totalPages !== 1 &&
              handlePage(ind + 1)
          }}>{ind + 1}</button>

        }
      })}
    </div>
  )
}

export default Pagination