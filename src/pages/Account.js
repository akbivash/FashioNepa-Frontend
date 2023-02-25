import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal, openModal } from "../redux/modalSlice";
import Modal from "../components/Modal";
const Account = () => {
  const{currentUser, error} = useSelector(state => state.user)
  const{isModal} = useSelector(state => state.modal)
  const dispatch = useDispatch()
 
const signOut = () => {

}

  return (
    <div className="relative">
  {currentUser === null  && <div className="text-center grid gap-8 py-10">
 
 <span>You have not created account yet</span>
 <Link to='/register' className="bg-green-dark p-5  w-fit mx-auto text-white">Sign Up</Link>
</div>}
      {currentUser !== null  && <div className="grid gap-2 place-items-center p-4">
       <span className="font-bold text-5xl border-2 border-green-default rounded-full text-green-default p-4">{currentUser.user.username.slice(0,1).toUpperCase()}</span>
        <span className="font-semibold">Hello {currentUser.user.username}</span>
        <div>Welcome to  <span className="logo  pl-2  font-bold text-[1.4rem]  tracking-[2px] text-transparent  bg-clip-text bg-gradient-to-r from-yellow-default to-green-dark">
         FashioNepa
        </span></div>
        <Link to='/products' className="bg-green-dark px-4 text-white py-2">Shop Now</Link>
       <Link to='/logout' className="mt-4 bg-yellow-dark text-white py-2 px-4">Sign Out</Link>
      </div>}
    </div>
  );
};

export default Account;
