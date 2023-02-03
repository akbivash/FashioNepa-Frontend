import React from "react";

import "./index.css";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Products from "./components/Products";
// import NewsLetter from './components/NewsLetter'
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  Routes,
  Route,

  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import ProductList from "./components/ProductList";
import Pay from "./pages/stripe/Pay";
import ProductDisplay from "./pages/stripe/Pay";
import Success from "./pages/Success";
import Notification from "./components/notifications/Notification";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import Watchlist from "./pages/Watchlist";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./redux/modalSlice";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
const {currentUser} = useSelector(state => state.user)
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(closeModal())
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        e.currentTarget != "undefined" &&
        e.target.className.baseVal != "menu"
      ) {
        closeSidebar();
      }

    });
  }, [isSidebarOpen]);

  const handleMenu = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <div className="app relative">

        <div className="navbar z-40  bg-white flex px-2 sm:px-4 md:px-8 fixed top-0 shadow-sm justify-center  shadow-[#ccc]   h-14 w-full ">
          <Navbar handleMenu={handleMenu} isSidebarOpen={isSidebarOpen} />
          <div className={`${isSidebarOpen ? "fixed right-0 top-[9vh] bg-white shadow-md  z-[100] w-full max-w-md  duration-300 opacity-100"
            : " absolute right-[-50%] opacity-0 top-[9vh] duration-500"}`}><Sidebar /> </div>
        </div>
        <div className="mt-10 py-4 z[2] max-w-[1400px] mx-auto ">
          <Routes>
            <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products/product/:id" element={<Product />} />
            <Route path="/:category/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
             
            <Route path="/login" exact element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Pay />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/watchlist/:id" element={<Product />} />
          </Routes>
        </div>
        <div className="bg-green-dark">
          {" "}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
