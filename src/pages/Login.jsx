import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { login } from "../redux/apiCalls";
import { closeModal, openModal } from "../redux/modalSlice";
import Modal from "../components/Modal";
import { FaTimes } from "react-icons/fa";
import { setErrorMsg } from "../redux/userSlice";

const Login = ({state}) => {
  const dispatch = useDispatch()
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const{isModal} = useSelector(state => state.modal)
const{currentUser, isFetching, error, errorMsg} = useSelector(state => state.user)
const navigate = useNavigate()

useEffect(() => {
  currentUser && !error && setTimeout(() => {
    navigate('/')
  },2000)
 


},[currentUser])

  function handleLogin(e){
e.preventDefault()
login(dispatch, {username, password})
if(!isFetching && error && errorMsg === ""){
  dispatch( setErrorMsg('server error, try again'))
 }

 setTimeout(() => {
  dispatch( setErrorMsg(''))

  },[2000])
  }
function handleForgot(e){
  e.preventDefault()
  dispatch(openModal())
}
  return (
    <>

    <div className=" flex justify-center  items-center p-3 ">
    {currentUser && <span className="py-7">You are  logged in</span>}
    {!currentUser &&   <form
        action=""
        className="flex flex-col  bg-white rounded-md w-full  drop-shadow-lg shadow-black max-w-[400px] gap-3 p-8 "
      >
        <h2 className="text-2xl">SIGN IN</h2>
    {error && <span className="text-red-default ">{errorMsg}</span>}
    {/* {error && errorMsg === "" && <span className="text-red-default ">Server error</span>} */}

        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
          className="p-3 border-[1px] border-[#ccc] rounded-md outline-0"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-[1px] border-[#ccc] rounded-md outline-0"
        />
        <input
          type="submit"
          value="LOGIN"
          onClick={handleLogin}
          disabled={isFetching}
          className="bg-green-dark disabled:opacity-50 p-3 text-white rounded-md max-w-[100px] cursor-pointer  "
        />
        <button className="text-yellow-dark text-left" onClick={handleForgot}>
          Forgot Password ?
        </button>
        <Link to="/register" className="text-green-dark">
          Create an account
        </Link>
      </form>}
   {isModal && <Modal>
<span > create new account again</span>
<div className="flex gap-4 items-center"><Link to='/register' className="bg-green-dark p-2 ">Ok</Link><span className="text-yellow-light text-2xl cursor-pointer" onClick={() => dispatch(closeModal())}><FaTimes/></span></div>
   </Modal>}
    </div>
    </>
  );
};

export default Login;
