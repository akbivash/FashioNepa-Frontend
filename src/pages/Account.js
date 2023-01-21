import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const signOut = () => {};

  return (
    <div>
      <div className="grid gap-2 place-items-center p-4">
        <img
          src={require("../assets/images/biv.jpg")}
          className=" w-20 h-20  rounded-full object-cover"
          alt="biv"
        />
        <span>Username : biv@gmail.com</span>
        <span>Phone: 9807559999</span>
        <span>Address: Kathmandu</span>
        <Link
          to="/account/signout"
          className="bg-yellow-dark text-white py-1 px-4 rounded-md "
          onClick={signOut}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Account;
