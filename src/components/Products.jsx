import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Product from '../components/Product'
import { useFetch } from "../customhooks/useFetch";
import Loading from './Loading'

const Products = ({  filters, sort }) => {
const[page, setPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState([]);
const{products,isError,isLoading} = useFetch(page)

  useEffect(() => {
  filteredProducts && setFilteredProducts(
      products.filter((product) => {
        if (
          product.color.includes(filters.color) ||
          product.size.includes(filters.size)
        ) {
          return product;
        } else if (!filters.color && !filters.size) {
          return 
        } 
      })
    ); 
    
  }, [ filters]);

  useEffect(() => {
  if(products)
   if ( sort === "asc") {
    setFilteredProducts([...products].sort((a, b) => {
     return a.price - b.price;
 }
) )
   
 } else if ( sort === "desc") {
   setFilteredProducts( [...products].sort((a, b) => {
       return b.price - a.price;
     })
   );
 }else if( sort === "newest"){
   setFilteredProducts( [...products].sort((a,b) => {
     return a.createAt - b.createdAt
   }))
 }

  }, [ sort]);

  return (
    <>
  
   { products && <div className="grid  grid-cols-2 md:grid-cols-4 justify-center place-items-center relative h-full mt-4 gap-2  ">
      {filteredProducts.length != 0
        ? filteredProducts.map((item, index) => {
            return <Product item={item} key={item._id} />;
          })
        :  products.map((item, index) => {
            return <Product item={item} key={item._id}   />;
          })}

    </div>} 
    {isLoading && !isError&& <Loading/>}
     {!isError && !isLoading && <Pagination page={page} setPage={setPage} />}
     {isError && <div className="text-center py-2">
   Failed to fetch, try Again 😐 
    </div>}   
</>
  );
};

export default Products;
