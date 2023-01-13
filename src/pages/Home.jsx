import React from "react";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="home ">
      <Slider />
      <Categories />
      <ProductList />
    </div>
  );
};

export default Home;
