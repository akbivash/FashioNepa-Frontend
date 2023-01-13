import React, { useState } from "react";
import styled from "styled-components";
import "../index.css";
import {useSelector} from 'react-redux'
import { FaSearch,FaHome, FaCartPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const quantity = useSelector(s => s.cart.quantity)
  const [isHidden, setIsHidden] = useState(true);

  const handleSearchBox = () => {
    setIsHidden(() => !isHidden);
  };

  return (
    <>
      <div className="flex  w-full items-center  max-w-[1400px]   ">
        <div className="logo  flex-1 font-bold sm:text-[1.4rem]  tracking-[2px]">
          FashioNepa
        </div>
       
        <div className="flex  flex-[3] sm:gap-7 items-center justify-end gap-4 relative">
        <div className="search_box   max-w-[500px]  flex justify-center items-center w-full  relative  ">
          <input
            type="text"
            className="hidden md:block w-full border-[1px] border-[#ccc] outline-[#bbb] rounded-lg overflow-hidden p-2"
          />
          <div
            className="icon cursor-pointer absolute  text-xl md:text-black right-[10%]"
            onClick={handleSearchBox}
          >
            {isHidden ? <FaSearch /> : <FaTimes />}
          </div>
        </div>
          <Link
           to='/register'
            className="bg-green-dark cursor-pointer text-sm tracking-wide text-white  p-1 rounded-md"
          >
            Register
          </Link>
         <Link to='./cart'>
     
          <div className="text-2xl relative cursor-pointer">
             <div className="badge absolute w-[20px] h-[20px] rounded-[50%] text-sm top-[-.7rem] right-[-.7rem]  flex justify-center items-center   bg-yellow-dark text-white text-center  ">
           {quantity}
          </div>
            <FaCartPlus />
          </div>
         </Link>
      <Link to='/' className="text-2xl"><FaHome/></Link>

        </div>
      </div>

      {/* hidden search_box  */}
      {!isHidden && (
        <input
          type="text"
          className="border-[.5px] border-[#bbb] shadow-lg shadow-[#bbb] outline-none rounded-sm max-w-[400px] left-[50%] translate-x-[-50%] top-[8vh] fixed w-full h-12   p-4 mt-3 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
