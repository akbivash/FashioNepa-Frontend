import React, { useEffect, useState } from "react";
import Product from '../components/Product'
import { useFetch } from "../customhooks/useFetch";
import Loading from './Loading'

const Products = ({ filters, sort }) => {


  const { isError, isLoading,  products} = useFetch()

const[filteredProducts,setFilteredProducts] = useState(products)

useEffect(() => {
setFilteredProducts(products.sort((a,b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
}))
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
 }else {
   setFilteredProducts( [...filteredProducts].sort((a,b) => {
     return new Date(b.createdAt) - new Date(a.createdAt)
   }))
 }
  }, [ sort]);
  
  return (
    <>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-center place-content-center  md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2'>
       {  filteredProducts.length !== 0 && filteredProducts.map(item => {
            return <Product item={item} key={item._id}   />;
          })
       }
{isError && <span className="text-center py-20">Failed to fetch, try again 😐</span>}
      {!isError && isLoading &&  <span className="py-20"><Loading /></span>}
       {filteredProducts.length === 0 && ( filters.color !== undefined || filters.size !== undefined) && <span className="text-center">No result found</span>}
      </div>
    </>
  );
};

export default Products;
