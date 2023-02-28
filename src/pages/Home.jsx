import React,{useState, useEffect} from "react";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";
import Product from '../components/Product'
import Dropdown from "../components/Dropdown";
import { useFetch} from "../customhooks/useFetch";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Sports  Entertainment",
  "90's Fashion",
  "Made in Nepal",
];
const Home = () => {
const {allProducts,isLoading, isError } = useFetch()
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(4)
const [startIndex, setStartIndex] = useState((page - 1) * limit)
const [endIndex, setEndIndex] = useState(limit)

useEffect(() => {
  setStartIndex((page - 1) * limit)
  setEndIndex(page * limit)
}, [page])

  return (
    <div className="home grid gap-2 relative  ">
      <div className="flex ">
        <div className="md:grid hidden pl-10 pr-20  py-10 ">
          {categories.map((cat) => {
            return (
              <Link
                to={`category/${cat.toLowerCase().replace(/\s+/g, "")}`}
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
     
      <h2 className="text-center text-3xl py-4 border-b-2 border-green-dark mx-auto text-green-dark">More items</h2>
      {allProducts && <div className="grid grid-cols-2 md:grid-cols-4 justify-center place-items-center relative h-full  gap-2  " >
      {allProducts.slice(startIndex,endIndex).map(item => {
        
        return <Product item={item} key={item._id} />;
      })}
      </div> }
      {isLoading && !isError && <div className="pb-8 ">  <Loading /> </div>}
      {!isError && !isLoading  && <Pagination page={page} setPage={setPage} limit={limit} setStartIndex={setStartIndex} setEndIndex={setEndIndex} />}
      {isError && <div className="text-center py-4">
        Failed to fetch, try Again 😐
      </div>}
      </div>
   
  );
};

export default Home;
