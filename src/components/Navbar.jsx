import React, { useState } from "react";
import "../index.css";
import { useSelector } from "react-redux";
import { BiLeftArrow, BiSearch } from "react-icons/bi";
import { FaHome, FaTimes } from "react-icons/fa";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Navbar = ({ handleMenu, isSidebarOpen }) => {
  const quantity = useSelector(state => state.cart.quantity);
  const [isSearchboxOpen, setIsSearchboxOpen] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", closeOpenedSearchBox);

    return () => {
      window.removeEventListener("resize", closeOpenedSearchBox);
    };
  }, []);
  const closeOpenedSearchBox = () => {
    if (window.innerWidth > 768) {
      setIsSearchboxOpen(true);
    }
  };
  const handleSearchBox = () => {
    setIsSearchboxOpen(() => !isSearchboxOpen);
  };

  return (
    <>
      <div className="flex  w-full items-center gap-10 justify-between max-w-[1400px]   ">
        {/* top left  */}
        <div className="logo  font-bold lg:text-[1.4rem]  tracking-[2px] text-transparent  bg-clip-text bg-gradient-to-r from-yellow-default to-green-dark">
          <Link to="/">FashioNepa</Link>
        </div>

        {/* top right  */}
        <div className="flex grow-[2]   justify-end items-center gap-5 lg:gap-10">
          <div className="search_box overflow-hidden rounded-md max-w-xl  flex justify-end items-center w-full  relative  ">
            <input
              type="text"
              className=" hidden md:block w-full   border-[1px] border-[#ccc] outline-yellow-dark p-2"
            />
            {isSearchboxOpen && (
              <div
                className="icon cursor-pointer rounded-md md:rounded-none md:absolute z-50  right-0 h-full grid place-items-center  md:bg-yellow-dark p-2"
                onClick={handleSearchBox}
              >
                <AiOutlineSearch className="text-xl " />
              </div>
            )}
          </div>

          {/* cart icon  */}
          <div className="  relative cursor-pointer">
            <Link to="./cart">
              <div className="badge absolute w-[20px] h-[20px] rounded-[50%] text-xs top-[-.7rem] right-[-.7rem]  flex justify-center items-center   bg-yellow-dark text-white text-center  ">
                {quantity}
              </div>
              <AiOutlineShoppingCart className="text-2xl " />
            </Link>
          </div>

          {/* menu icon  */}
          <div
            className="text-2xl md:hidden cursor-pointer"
            onClick={handleMenu}
          >
            {isSidebarOpen ? <FaTimes /> : <AiOutlineMenu className="menu" />}
          </div>
          <div className="hidden gap-4  md:flex">
            <Link to="/login">Login</Link>
            <Link to="/account">Account</Link>
            <Link to="/help">Help</Link>
            {/* <Link to='/' className="grid place-items-center" ><FaHome/></Link> */}
            
         

          </div>
        </div>
      </div>

      {/* hidden search_box  */}
      {!isSearchboxOpen && (
        <div>
          <input
            type="text"
            className="border-[.5px] px-16 rounded-sm absolute left-0 h-full right-0   md:hidden"
          />

          <span
            className="absolute md:hidden text-2xl left-5 grid place-items-center h-full cursor-pointer "
            onClick={handleSearchBox}
          >
            {" "}
            <BiLeftArrow />
          </span>
          <span className="absolute md:hidden right-5 text-2xl grid place-items-center h-full">
            <BiSearch />
          </span>
        </div>
      )}
    </>
  );
};

export default Navbar;
