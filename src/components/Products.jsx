import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Product from '../components/Product'
import { useFetch } from "../customhooks/useFetch";
import Loading from './Loading'
import { useLocation } from "react-router-dom";

const Products = ({ filters, sort }) => {


  const { isError, isLoading,  products,category} = useFetch()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
const[filteredProducts,setFilteredProducts] = useState(products)

useEffect(() => {
setFilteredProducts(products)
},[products])

useEffect(() => {
  filteredProducts && setFilteredProducts(
      products.filter((product) => {
        
   if (!filters.color && product.size.includes(filters.size)) {
    return product
        } 
        if(!filters.size && product.color.includes(filters.color)){
          return product
        }
        if(product.size.includes(filters.size) &&  product.color.includes(filters.color)){
return product
        }
        if(!filters.color && !filters.size){
          return product
        }
      })
    ); 
    
  }, [ filters]);
  useEffect(() => {
 
   if ( sort === "asc") {
    setFilteredProducts([...filteredProducts].sort((a, b) => {
     return a.price - b.price;
 }
) )
   
 } else if ( sort === "desc") {
   setFilteredProducts( [...filteredProducts].sort((a, b) => {
       return b.price - a.price;
     })
   );
 }else if( sort === "newest"){
   setFilteredProducts( [...filteredProducts].sort((a,b) => {
     return b.createAt - a.createdAt
   }))
 }

  }, [ sort]);

  return (
    <>
    
 
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-center place-content-center  md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2'>
        
       {   filteredProducts.length !== 0 ? filteredProducts.map(item => {
            return <Product item={item} key={item._id}   />;
          }) :  <span className="mx-auto pt-14 pb-8">No results found</span>
        
          
       }
          

      </div>
      {isLoading && !isError && <div className="py-16 ">  <Loading /> </div>}
      { isError && <div className="text-center py-8">
        Failed to fetch, try Again 😐
      </div>}
      {/* {!isError && !isLoading  && <Pagination page={page} setPage={setPage} limit={limit} setStartIndex={setStartIndex} setEndIndex={setEndIndex} />} */}

   
    </>
  );
};

export default Products;
