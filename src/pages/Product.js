import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import {useDispatch} from 'react-redux'
import { addProduct } from "../redux/cartSlice";

const Product = () => {
const dispatch = useDispatch()

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idWithCategory = location.pathname.split("/")[3];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get(`products/${id}`);
        const data = await response.data;

        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getProduct = async () => {
      const response1 = await publicRequest.get(`products/${idWithCategory}`);
      const data1 = await response1.data;
      setProduct(data1);
    };
    getProduct();
  }, [idWithCategory]);

  function handleQuantity(type) {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  }

  function addToCart() {
   dispatch(addProduct({...product, quantity, size:product.size, color:product.color}))
  }


  return (
    <div className="sm:flex pt-[8vh] grid px-2 place-items-center gap-8  sm:justify-center  ">
      <img
        src={product.img}
        alt=""
        className=" w-full max-w-[380px] h-[300px] sm:h-[400px] rounded-sm "
      />

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl ">{product.title}</h2>
        <p className="text-center">{product.desc}</p>
      
          <span className="text-2xl">Rs {product.price }</span>
        
        <div className="flex items-center gap-3">
          <span>Color</span>

          { product && product.color && product.color.map((c) => {
            console.log(c)
              return  <span key={c} className={`w-5 h-5 rounded-full bg-${c}-dark`}></span>
            }) }
          {/* {product.color} */}

          {/* <span  className={`w-5 h-5 rounded-full bg-${product.color}`}></span> */}
          <div className="size_btn flex">
            <span>Size</span>
            <select className=" mx-2 border-2 text-black rounded-sm outline-none ">
              <option value="xs">{product.size}</option>
              <option value="sm">Sm</option>
              <option value="lg">Lg</option>
              <option value="xl">Xl</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10 ">
          <div className="flex gap-5 items-center">
            <span
              className="bg-yellow-dark cursor-pointer w-5 h-1 "
              onClick={() => handleQuantity("dec")}
            ></span>
            <span className="text-2xl">{quantity}</span>
            <span className="bg-green-dark cursor-pointer w-5 h-1 relative">
              <span
                className="bg-green-dark w-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-5 absolute"
                onClick={() => handleQuantity("inc")}
              ></span>
            </span>
          </div>
          <button
            className="bg-green-dark p-3 rounded-sm text-white "
            onClick={addToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
