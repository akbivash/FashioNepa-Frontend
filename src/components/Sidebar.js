import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../assets/data";

const Sidebar = () => {


  return (
    <>
      <ul className="grid bg-white z-40 gap-4 transition-all duration-500 py-3 ">
        {sidebarLinks.map((l) => {
          return (
            <Link
              key={l.name}
              to={l.link}
              className="w-full bg-white  text-center  border-b-[1px] border-[#c4c3bf]"
            >
              {l.name}
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Sidebar;
