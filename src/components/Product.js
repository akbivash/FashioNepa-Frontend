import React from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToWatchList } from "../redux/cartSlice";
import { closeModal, openModal } from "../redux/modalSlice";

import Modal from "./Modal";

const Product = ({ item }) => {
  const category = useParams().category
  const { isModal } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.cart.watchlist);

  const handleLove = (item) => {
    dispatch(openModal());
    dispatch(addToWatchList({item }));

    setTimeout(() => {
      dispatch(closeModal());
    }, 2000);
  };
  return (
    <>
      <div className=" group relative  shadow-[0_4px_7px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden  w-full max-w-[400px] aspect-auto h-[260px] mx-auto shadow-cyan-500/50   ">
        <img
          src={item.img}
          alt="img"
          className=" object-cover  w-full  h-full   "
        />
        <div className="absolute w-fit h-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 invisible group-hover:visible transition-all group-hover:transition-all group-hover:bg-[rgba(0,0,0,0.3)] z-10 ">
          <div className="icons flex gap-4">
            <Link to={category ? `/category/${category}/${item._id}` : `product/${item._id}`}>
              <FaSearch className="bg-white p-1  text-green-dark rounded-full text-3xl cursor-pointer" />
            </Link>
            <FaHeart
              className="bg-white p-1  text-[red] rounded-full text-3xl cursor-pointer"
              onClick={() => handleLove(item)}
            />
          </div>
        </div>
      </div>
      {isModal && (
        <Modal className="fixed">
          <h2>Added to watchlist</h2>
        </Modal>
      )}
    </>
  );
};

export default Product;
