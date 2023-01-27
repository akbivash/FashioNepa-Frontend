import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Watchlist = () => {
    const watchlist = useSelector(state => state.cart.watchlist)
    return (
        <div className='p-3 grid place-items-center'>
            {watchlist.length != 0 ? watchlist.map(list => {
              const{item} = list
            return    <div className="h-full group relative w-full shadow-[0_4px_7px_rgba(0,0,0,0.4)] rounded-sm   shadow-cyan-500/50 max-w-[350px]  " key={item.img}>

                    <img
                        src={item.img}
                        alt="img"
                        className="w-full     h-[300px] "
                    />
                    <div className="absolute w-full h-full invisible group-hover:visible transition-all group-hover:transition-all group-hover:bg-[rgba(0,0,0,0.3)] top-0 z-10 flex justify-center items-center">
                        <div className="icons flex gap-3">
                        <Link to={`product/${item._id}`}>
<FaSearch className="bg-white p-1  text-green-dark rounded-full text-3xl cursor-pointer" />

</Link>
                        </div>
                    </div>
                </div>
            }) : <span >No items, Add to the watchlist first</span>}
        </div>
    )
}

export default Watchlist