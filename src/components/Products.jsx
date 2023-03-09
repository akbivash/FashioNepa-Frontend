import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from '../components/Product'
import { useFetch } from "../customhooks/useFetch";
import Loading from './Loading'

const Products = ({ filters, sort }) => {
  const category = useParams().category
const[wrongRoute, setWrongRoute] = useState(false)
  const { isError, isLoading,  products} = useFetch()

const[filteredProducts,setFilteredProducts] = useState(products)
const categories = ["women'sshoes",'cap','sportsentertainment',"men'sshoes", "90'sfashion","madeinnepal","women'sfashion","men'sfashion"]


useEffect(() => {
  if(!isError && category !== undefined && !categories.includes(category)){
   setWrongRoute(true)
   
  }else{
    setWrongRoute(false)
  }

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
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-center  md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 min-h-screen'>
       {  filteredProducts.length !== 0 && filteredProducts.map(item => {
            return <Product item={item} key={item._id}   />;
          })
       }
{isError && <span className="text-center py-20">Failed to fetch, try again 😐</span>}
      {!isError && isLoading &&  <span className="py-20"><Loading /></span>}
       {wrongRoute && <span className="text-center text-red-default">Wrong route !</span>}
       {(filters.size !== undefined || filters.color !== undefined) && filteredProducts.length === 0 && <span className="text-center">No items found</span>}
      </div>
    </>
  );
};

export default Products;
