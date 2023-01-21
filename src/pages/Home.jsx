import React from "react";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryItem from "../components/CategoryItem";
import {useRef, useEffect} from 'react'

const Home = () => {
  const ref = useRef()

  useEffect(() => {
window.addEventListener('scroll', showCat)

return () => {
window.removeEventListener('scroll', showCat)

}
  },[])

  const showCat = (e) => {
 
    if(window.scrollY > 200){
      ref.current.style.display = 'block'
    }else{
      ref.current.style.display = 'none'

    }
  }

  return (
    <div className="home relative overflow-hidden">
      <div className="flex">
        <div className="md:grid place-items-center text-lg hidden w-80">
          <span>Men's Fashion</span>
          <span>Women's Fashion</span>
          <span>Sports & Entertainment</span>
          <span>90s Fashion</span>
          <span>Made in Nepal</span>
        </div>
        <Slider />

        <div className="z-30 fixed w-full " ref={ref}>
          <select className="grid gap-4 text-md md:hidden  outline-none    w-full py-2 text-center shadow-lg ">
            <option defaultChecked>Choose a category</option>
            <option className="h-10" value="Men's Fashion">
              Men Fashion
            </option>
            <option value="Women's Fashion">Women's Fashion</option>
            <option value="Sports & Entertainment">
              Sports & Entertainment
            </option>
            <option value="90s Fashion">90s Fashion</option>
            <option value="Made in Nepal">Made in Nepal</option>
          </select>
        </div>
      </div>

      <CategoryItem />
      <ProductList />
    </div>
  );
};

export default Home;
