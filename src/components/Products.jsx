import React, { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
const Products = ({  filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
const[isError, setIsError] = useState(false)

const[page, setPage] = useState(1)
const[limit, setLimit] = useState(4)
const category = useParams().category
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `api/v1/products/?category=${category}&page=${page}&limit=${limit}`
            : `api/v1/products/?page=${page}&limit=${limit}`
        );
       
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setIsError(true)
      }
    };
    getProduct();
   
  }, [ page, category]);

  useEffect(() => {
   setFilteredProducts(
      products.filter((product) => {
        if (
          product.color.includes(filters.color) ||
          product.size.includes(filters.size)
        ) {
          return product;
        } else if (!filters.color && !filters.size) {
          return product;
        } 
      })
    ); 
  }, [products, filters]);

  useEffect(() => {
  if ( sort === "asc") {
    setFilteredProducts(prev => [...prev].sort((a, b) => {
     return a.price - b.price;
 }
) )
   
 } else if ( sort === "desc") {
   setFilteredProducts(prev => [...prev].sort((a, b) => {
       return b.price - a.price;
     })
   );
 }else if( sort === "newest"){
   setFilteredProducts(prev => [...prev].sort((a,b) => {
     return a.createAt - b.createdAt
   }))
 }


  }, [products, sort]);

 
  return (
    <>
    <div className="grid grid-cols-2  sm:grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))] justify-center place-items-center relative h-full mt-4 gap-2  ">
      {filteredProducts.length != 0
        ? filteredProducts.map((item, index) => {
            return <Product item={item} key={item._id} category={category}/>;
          })
        : products.map((item, index) => {
      
            return <Product item={item} key={item._id} category={category}  />;
          })}

    </div>
   
    {!isError && <Pagination page={page} setPage={setPage} category={category}/>}
    <span className="flex justify-center">  { isError ? 'Server is not connected, try again': products.length === 0  ? 'No Items Found': '' }</span>
</>
  );
};

export default Products;
