import React from "react";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";

import Dropdown from "../components/Dropdown";
const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports  Entertainment",
  "90's Fashion",
  "Made in Nepal",
];
const Home = () => {


  return (
    <div className="home relative overflow-hidden">
      <div className="flex">
        <div className="md:grid hidden pl-10 pr-20  py-10 ">
          {categories.map((cat) => {
            return (
              <Link
                to={`${cat.toLowerCase().replace(/\s+/g, "")}`}
                key={cat}
                className="cursor-pointer h-fit"
              >
                {cat}
              </Link>
            );
          })}
        </div>

        <Slider />

        <Dropdown />
      </div>

      <CategoryItem />
    <div className="relative">
    <ProductList />
    </div>
    </div>
  );
};

export default Home;
