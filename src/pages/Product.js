import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useFetch } from "../customhooks/useFetch";
import {BsPlusSquare,} from 'react-icons/bs'
import {AiOutlineMinusCircle} from   'react-icons/ai';
import {BiPlusCircle} from 'react-icons/bi'
import { closeModal, openModal, setText } from "../redux/modalSlice";

const Product = () => {
  const dispatch = useDispatch()
  const { isModal } = useSelector(state => state.modal)
  const [isInCart, setIsInCart] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const { product, isLoading, isError } = useFetch()
  let color = product.color && product.color.length > 1 ? product.color[0] : product.color
  let size = product.size && product.size.length > 1 ? product.size[0] : product.size
  const { currentUser } = useSelector(state => state.user)
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
    if (currentUser !== null && product.price !== undefined) {
      dispatch(openModal())
      dispatch(addProduct({ ...product, quantity, size, color }))
      setIsInCart(true)
      setTimeout(() => { dispatch(closeModal()) }, 1000)
    } else {
      dispatch(openModal())
    }
  }

  const handleColor = (e) => {
    color = e.target.value
  }
  const handleSize = (e) => {
    size = e.target.value
  }
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && <div className="text-center pt-7">Sorry, try again 😐</div>}
      {product && <div className="sm:flex pt-[8vh] grid px-4 place-items-center gap-8  lg:gap-20 sm:justify-center  ">
        <img
          src={product.img}
          alt=""
          className=" w-full max-w-[300px] h-[260px] sm:h-[400px] md:max-w-[400px] object-cover rounded-sm "
        />

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl ">{product.title}</h2>
          <p className="text-center">{product.desc}</p>
          <span className="text-2xl">Rs {product.price}</span>
          <div className="flex items-center gap-3">
            <span>Color</span>
            <select className=" mx-2 border-2 text-black rounded-sm outline-none " onChange={handleColor}>
              {product && product.color && product.color.map((color) => {
                return <option value={color} key={color} >{color}</option>
              })}
            </select>

            <div className="size_btn flex">
              <span>Size</span>
              <select className=" mx-2 border-2 text-black rounded-sm outline-none " onChange={handleSize}>
                {product.size && product.size.map(size => {
                  return <option value={size} key={size} >{size}</option>
                })}
              </select>
            </div>
          </div>

          <div className="flex gap-10 ">
            <div className="flex gap-5 items-center">
              <span
                className="text-4xl text-yellow-dark cursor-pointer"
                onClick={() => handleQuantity("dec")}
              ><AiOutlineMinusCircle/></span>
              <span className="text-2xl ">{quantity}</span>
              <span className="text-green-dark cursor-pointer text-4xl relative"   onClick={() => handleQuantity("inc")}>
                <BiPlusCircle/>
              </span>
            </div>
            {
              isInCart ? <Link to='/cart' className="bg-green-dark p-3 rounded-sm text-white  text-center w-[130px]">Open Cart</Link> : <button
                className="bg-green-dark p-3  text-center rounded-sm text-white disabled:opacity-50  w-[130px]"
                onClick={addToCart}
                disabled={product.price === undefined || product === undefined || isError || isLoading}
              >
                ADD TO CART
              </button>
            }
            {isModal && currentUser !== null && <Modal className='fixed'>
              <h2>Added to cart</h2>
            </Modal>}
            {isModal && currentUser === null && <Modal className='fixed'>
              <div className="grid gap-2">
                <span className="flex gap-2 items-center"> Please sign up to add item <img src="https://em-content.zobj.net/source/skype/289/smiling-face-with-smiling-eyes_1f60a.png" alt="" className="h-10 w-10" /></span>
                <span className="flex gap-3 items-center"><Link to='/register' className="bg-green-default py-2 text-[#000] px-7">Ok</Link> <Link to='/products' className="bg-yellow-default text-[#000] px-7 py-2">Cancel</Link></span>
              </div>
            </Modal>}
          </div>
        </div>
      </div>}
    </>
  );
};

export default Product;
