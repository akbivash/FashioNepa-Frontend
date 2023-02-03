import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal, openModal } from "../redux/modalSlice";
import Modal from "../components/Modal";
const Account = () => {
  const{currentUser} = useSelector(state => state.user)
  const{isModal} = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const signOut = () => {

  };

  return (
    <div>
      <div className="grid gap-2 place-items-center p-4">
        <img
          src={require("../assets/images/biv.jpg")}
          className=" w-20 h-20  rounded-full object-cover"
          alt="biv"
        />
        <span>Username : {currentUser.user.username}</span>
        <span>Email: {currentUser.user.email}</span>
        
        <Link
          className="bg-yellow-dark text-white py-1 px-4 rounded-md "
          onClick={() => dispatch(openModal())}
        >
          Sign Out
        </Link>
        {isModal &&
          <Modal>
<span >Do you really want to leave us 🙁</span>
<span className="flex gap-4"><button className="bg-yellow-dark px-3" onClick={signOut}>Yes</button><button className="bg-white text-black-default px-3" onClick={() => dispatch(closeModal())}>No</button></span>
        </Modal>
   }
      </div>
    </div>
  );
};

export default Account;
