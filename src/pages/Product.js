import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useFetch } from "../customhooks/useFetch";
import { closeModal, openModal } from "../redux/modalSlice";

const Product = () => {
  const dispatch = useDispatch()
  const { isModal } = useSelector(state => state.modal)
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false)
  const { product, isLoading, isError } = useFetch()
  const cartProducts = useSelector(state => state.cart.products)

  useEffect(() => {
    product && cartProducts.map(p => {
      if (p._id === product._id) {
        setIsInCart(true)
      }
    })
  }, [product])

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
    dispatch(openModal())
    dispatch(addProduct({ ...product, quantity, size: product.size, color: product.color }))
    setIsInCart(true)
    setTimeout(() => { dispatch(closeModal()) }, 1000)
  }


  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && <div className="text-center mt-2">Sorry, try again 😐</div>}
      {product && <div className="sm:flex pt-[8vh] grid px-2 place-items-center gap-8  sm:justify-center  ">
        <img
          src={product.img}
          alt=""
          className=" w-full max-w-[380px] h-[300px] sm:h-[400px] rounded-sm "
        />

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl ">{product.title}</h2>
          <p className="text-center">{product.desc}</p>

          <span className="text-2xl">Rs {product.price}</span>

          <div className="flex items-center gap-3">
            <span>Color</span>
            <select className=" mx-2 border-2 text-black rounded-sm outline-none ">
              {product && product.color && product.color.map((color) => {

                return <option value={color} key={color} >{color}</option>
              })}
            </select>

            <div className="size_btn flex">
              <span>Size</span>
              <select className=" mx-2 border-2 text-black rounded-sm outline-none ">

                {product.size && product.size.map(size => {
                  return <option value={size} key={size}>{size}</option>
                })}
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
            {
              isInCart ? <Link to='/cart' className="bg-green-dark p-3 rounded-sm text-white ">Open Cart</Link> : <button
                className="bg-green-dark p-3 rounded-sm text-white "
                onClick={addToCart}
                disabled={isError && product.length === 0}
              >
                ADD TO CART
              </button>
            }
            {isModal && <Modal className='fixed'>
              <h2>Added to cart</h2>
            </Modal>}
          </div>
        </div>
      </div>}
    </>
  );
};

export default Product;
