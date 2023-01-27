import React, { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../requestMethods";

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
const[isError, setIsError] = useState(false)
 
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `api/v1/products?category=${category}`
            : "api/v1/products"
        );
       
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setIsError(true)
      }
    };
    getProduct();
    
  }, [ category]);



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
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]  sm:grid-cols-3  place-items-center lg:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]  relative h-full mt-4 gap-2  ">
      {filteredProducts.length != 0
        ? filteredProducts.map((item, index) => {
            return <Product item={item} key={index} category={category}/>;
          })
        : products.map((item, index) => {
         
            return <Product item={item} key={index} category={category}  />;
          })}
      { isError ? 'Server is not connected': products.length === 0  ? 'No Items Found': '' }

    </div>
  );
};

export default Products;
