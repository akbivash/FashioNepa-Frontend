import React from 'react'
import { FaSearch, FaCartPlus, FaHeart } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const Product = ({item, category}) => {
const location = useLocation()
  return (
    <div className="h-full group relative w-full shadow-[0_4px_7px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden  shadow-cyan-500/50 max-w-[350px]  ">
 
         <img
        src={item.img}
        alt="img"
        className="w-full     h-[300px] "
      />
      <div className="absolute w-full h-full invisible group-hover:visible transition-all group-hover:transition-all group-hover:bg-[rgba(0,0,0,0.3)] top-0 z-10 flex justify-center items-center">
        <div className="icons flex gap-3">
          <FaCartPlus className="bg-white p-1  text-tahiti-dark rounded-full text-2xl cursor-pointer  " />
<Link to={category ? `${item._id}` : `product/${item._id}`}>
<FaSearch className="bg-white p-1  text-green-dark rounded-full text-2xl cursor-pointer" />

</Link>

          <FaHeart className="bg-white p-1  text-[red] rounded-full text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Product