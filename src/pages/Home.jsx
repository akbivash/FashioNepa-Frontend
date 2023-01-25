import React from "react";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryItem from "../components/CategoryItem";
import { useRef, useEffect } from "react";
import { Link, span } from "react-router-dom";
import { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports & Entertainment",
  "90's Fashion",
  "Made in Nepal",
];
const Home = () => {
  const [showCategory, setShowCategory] = useState(false);
  const ref = useRef();

  useEffect(() => {
    window.addEventListener("scroll", showChooseBtn);

    showChooseBtn();
    return () => {
      window.removeEventListener("scroll", showChooseBtn);
    };
  }, [showCategory]);

  function showChooseBtn() {
    if (window.scrollY > 200) {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }

  return (
    <div className="home relative overflow-hidden">
      <div className="flex">
        <div className="md:grid hidden pl-10 pr-20  py-10 ">
          {categories.map((cat) => {
            return (
              <Link
                to={`products/${cat.toLowerCase().replace(/\s+/g, "")}`}
                key={cat}
                className="cursor-pointer h-fit"
              >
                {cat}
              </Link>
            );
          })}
        </div>

        <Slider />

        <div
          className="z-30 fixed  w-full grid shadow-sm shadow-[#aaae9f] bg-white"
          ref={ref}
        >
          <span
            className=" flex items-center font-bold text-gray-default pl-10 gap-2 w-[50%] z-50     cursor-pointer"
            onMouseOver={() => setShowCategory(true)}
            onMouseOut={() => setShowCategory(false)}
          >
            Choose{" "}
            <span className="text-3xl">
              {" "}
              {showCategory ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
          </span>
          <div
            onMouseOver={() => setShowCategory(true)}
            onMouseOut={() => setShowCategory(false)}
            className={`${
              showCategory
                ? "grid w-[50%] absolute left-0 bg-white border-[#dfe0dc] border-2 place-items-center gap-2 py-2"
                : "hidden "
            }`}
          >
            {categories.map((cat) => {
              return (
                <Link
                  to={`products/${cat.toLowerCase().replace(/\s+/g, "")}`}
                  key={cat}
                  className={` border-b-gray-light cursor-pointer border-b-[1px]`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <CategoryItem />
      <ProductList />
    </div>
  );
};

export default Home;
