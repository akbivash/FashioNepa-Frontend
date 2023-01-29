import React from 'react'
import { publicRequest } from '../requestMethods'
import { useState,useEffect } from 'react'
import Products from './Products'

const Pagination = ({page, setPage}) => {
    const[products, setProducts] = useState([])
    const[limit, setLimit] = useState(4)
    const totalPages = Math.ceil(products.length/limit)
  

    useEffect(() => {
        const getProduct = async () => {
          const res = await publicRequest.get('api/v1/products')
          setProducts(res.data)
         
        }
        getProduct()
         },[])
        
         function handlePage(index){
setPage(index)
         }

  return (
    
    <div>
{totalPages > 0 && [...Array(totalPages)].map((item, ind) => {
   
    return <button key={ind} onClick={() => handlePage(ind)}>{ind}</button>
})}
    </div>
  )
}

export default Pagination