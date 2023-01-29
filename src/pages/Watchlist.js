import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../redux/cartSlice';
const Watchlist = () => {
    const watchlist = useSelector(state => state.cart.watchlist)
const dispatch = useDispatch()
    const removeWatchlist = (id) => {
dispatch(removeFromWatchlist(id))
    }
 
  
    
    return (
        <div className='p-3 grid gap-2 place-items-center'>
            {watchlist.length != 0 ? watchlist.map(list => {
              const{item} = list
         
            return    <div className="h-full group relative w-full shadow-[0_4px_7px_rgba(0,0,0,0.4)] rounded-sm   shadow-cyan-500/50 max-w-[350px]  " key={item.img}>

                    <img
                        src={item.img}
                        alt="img"
                        className="w-full     h-[300px] "
                    />
                    <div className="absolute w-fit bottom-0 right-0 p-4 h-fit invisible group-hover:visible transition-all group-hover:transition-all group-hover:bg-[rgba(0,0,0,0.3)]  z-10 ">
                        <div className="icons flex gap-3 items-center">
                        <Link to={`${item._id}`}>
<FaSearch className="bg-white p-1  text-green-dark rounded-full text-3xl cursor-pointer" />
</Link>
<button className='text-white bg-yellow-dark p-2' onClick={() => removeWatchlist(item._id)}>Remove</button>
                        </div>
                    </div>
                </div>
            }) : <span >No items, Add to the watchlist first</span>}
        </div>
    )
}

export default Watchlist