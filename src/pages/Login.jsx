import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { login } from "../redux/apiCalls";

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
const{currentUser, isFetching, error} = useSelector(state => state.user)
const navigate = useNavigate()
useEffect(() => {
if(currentUser !== null){
  navigate('/cart')
}
},[currentUser])

  function handleLogin(e){
e.preventDefault()
login(dispatch, {username, password})

  }
  return (
    <div className=" flex justify-center  items-center p-3 ">
      <form
        action=""
        className="flex flex-col  bg-white rounded-md w-full  drop-shadow-lg shadow-black max-w-[400px] gap-3 p-8 "
      >
        <h2 className="text-2xl">SIGN IN</h2>
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
          // disabled
          className="bg-green-dark p-3 text-white rounded-md max-w-[100px] cursor-pointer  "
        />
        <Link to="/forgot" className="text-yellow-dark">
          Forgot Password ?
        </Link>
        <Link to="/register" className="text-green-dark">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
