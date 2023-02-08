import React, { useRef } from 'react'
import { BiSearch, BiLeftArrow } from 'react-icons/bi'
import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { publicRequest } from '../requestMethods';
import {FaTimes} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
const Search = ({ isSearchBarOpen, setIsSearchBarOpen }) => {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedProducts, setSearchedProducts] = useState([])
  const [suggestionBox, setSuggestionBox] = useState(false)
const location = useLocation()
useEffect(() => {
  
  return ()=> {
    setIsSearchBarOpen(false)
setSearchText('')
  }
},[location.pathname])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get('/api/v1/products')
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    if(!searchText){
    setSuggestionBox(false)
    }else{
       setSuggestionBox(true)
    setSearchedProducts(products.filter(item => item.title.toLowerCase().trim('').includes(searchText)))
    }
 
  }, [searchText])



  return (
    <div className='w-full  max-w-xl z-40 search-ref ' >

      {/* search bar for larger device  */}
      {!isSearchBarOpen && <div className="h-fit search-ref  rounded-md flex  items-center w-full  relative  ">
        <input
          type="text"
          className=" hidden search-ref md:block w-full  border-[1px] border-[#ccc] outline-yellow-dark p-2"
          onChange={(e) => setSearchText(e.target.value)}
         value={searchText}
        />
        {/* suggestionBox */}
       
       {suggestionBox && <div className='bg-white search-ref shadow-3xl hidden absolute left-0 shadow-sm shadow-[#ccc]  w-full md:grid gap-1  top-[50px]  text-center '>
           {searchedProducts.length !== 0 ?  searchedProducts.slice(0, 10).map(p => {
            return <Link key={p._id} to={`/product/${p._id}`} className='font-semibold text-gray-default tracking-wider' onClick={() => setSuggestionBox(false)}>{p.title}</Link>
          }):'No results found'}
        </div>}
        <div
          className="icon  hidden cursor-pointer absolute  rounded-none  z-50  right-0 h-full md:grid place-items-center text-white bg-yellow-dark p-2"
        >
        {searchText ? <FaTimes onClick={() => setSearchText('')}/> :   <AiOutlineSearch className="text-2xl "  />}
        </div>
      </div>}

      {/* search bar for small device which is hidden initially */}
      {isSearchBarOpen && <div className='z-[60] search-ref'>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          className="border-[.5px] px-16 search-ref rounded-sm  absolute left-0 h-full right-0 top-0 "
        />
        {/* suggestionBox */}
       { isSearchBarOpen && suggestionBox && <div className= 'search-ref bg-white shadow-3xl shadow-gray-dark py-2 w-full grid gap-1 absolute left-0 top-[60px] text-center max-w-2xl'>
          { searchedProducts.length !== 0 ? searchedProducts.slice(0, 10).map(p => {
            return <Link key={p._id} to={`/product/${p._id}`} className='font-semibold text-gray-default tracking-wider' onClick={() => setSuggestionBox(false)}>{p.title}</Link>
          }):'No results found'}
        </div>}
        <span
          className="absolute top-0   text-2xl left-5 grid place-items-center h-full cursor-pointer "
          onClick={() =>{
            setIsSearchBarOpen(false)
            setSearchText('')
          }}
        >
          {" "}
          <BiLeftArrow />
        </span>
        <span className="absolute top-0  right-5  text-2xl grid place-items-center h-full">
        {searchText ? <FaTimes className='cursor-pointer' onClick={() => setSearchText('')}/> :   <AiOutlineSearch className="text-2xl cursor-pointer "  />}
         
        </span>
      </div>}
    </div>
  )
}

export default Search