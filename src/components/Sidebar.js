import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../assets/data";

const Sidebar = () => {
// const[showCategory, setShowCategory] = useState(false)
 
// const openCategory = () => {
// setShowCategory(true)
//   }

  return (
    <>
      <ul className="grid gap-4 transition-all duration-500 py-3 ">
        {sidebarLinks.map((l) => {
          return (
            <Link
              key={l.name}
              to={l.link}
              className="w-full  text-center  border-b-[1px] border-[#c4c3bf]"
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
