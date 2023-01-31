import React from 'react'
import { publicRequest } from '../requestMethods'
import { useState, useEffect } from 'react'
import { useFetch } from '../customhooks/useFetch'


const Pagination = ({page, setPage}) => {
  const [products, setProducts] = useState([])
  const { limit, category } = useFetch()
  const totalPages = Math.ceil(products.length / limit)


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `api/v1/products/?category=${category}`
            : `api/v1/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();

  }, [category])

  const handlePage = (index) => {
    setPage(index)
}

  return (

    <div className='flex flex-wrap justify-center gap-2 pt-4'>
      {totalPages > 0 && [...Array(totalPages)].map((item, ind) => {
        if (ind + 1 === page) {
          return <button key={ind} className='border-[1px] bg-green-dark text-white border-black px-2' onClick={() => handlePage(ind + 1)}>{ind + 1}</button>

        } else {
          return <button key={ind} className='border-[1px] border-black px-2' onClick={() => handlePage(ind + 1)}>{ind + 1}</button>

        }
      })}
    </div>
  )
}

export default Pagination