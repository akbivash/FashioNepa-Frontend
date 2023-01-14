import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

const data = [
 
  {
    id: "121",
    title: "Pure cotton Hoodie",
    info: "Winter sells",
    img:"https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?w=2000"
  },
  {
    id: "122",
    title: "Jeans Jacket",
    info: "Winter sells",
    img: "https://as2.ftcdn.net/v2/jpg/02/30/72/41/1000_F_230724124_ZWlHSZBIvqvdJQj9at15WaKRqAtCUKTu.jpg",
  },
  {
    id: "123",
    title: "Winter cap ",
    info: "New Fashion",
    img: "https://as1.ftcdn.net/v2/jpg/01/19/63/00/1000_F_119630095_HuopnyLJ6sd6TfvLEmVjW2nTTmyjQZqX.jpg",
  },
  {
    id: "124",
    title: "Winter jacket ",
    info: "New Fashion",
    img:'https://as2.ftcdn.net/v2/jpg/03/65/85/47/1000_F_365854716_ZHB0YN3i3s0H7NjI9hiezH53D5nvoF0E.jpg'
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const sliderContainerRef = useRef();

  useEffect(() => {
    sliderContainerRef.current.style.transform = `translateX(calc(-${
     100 * index
    }%))`;
 
sliderContainerRef.current.style.transition = '1s'
let intervelID = setInterval(() => {
setIndex(prev => prev + 1)
if(index === data.length - 1){
  setIndex(0)
}

},8000)

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervelID)
    };
  }, [index]);

  const handleResize = () => {
    sliderContainerRef.current.style.transform = `translateX(calc(-${
      sliderContainerRef.current.clientWidth * index
    }px))`;
  };

  const handleLeft = () => {
  if(index !== 0){
    setIndex((prev) => prev - 1);
  }else{
    setIndex(data.length - 1)
  }
  };
  const handleRight = () => {
  if(index < data.length - 1){
    setIndex((prev) => prev + 1);
  }else{
    setIndex(0)
  }
  };


  return (
    <div className="  overflow-hidden h-full  w-full relative">
      <div
        className={`flex h-[400px] min-w-full translate-x-0 `}
        ref={sliderContainerRef}
      >
        {data.map((item) => {
          return (
            <div key={item.id} className={` min-w-full`}>
              <img
                src={item.img}
                alt={data.title}
                className=" h-full w-full  mx-auto "
              />
            </div>
          );
        })}
        {/* icons  */}
      </div>
      <div className="absolute flex h-10  w-full top-[50%] -translate-y-[50%]">
        
          <BsArrowBarLeft className="arrow-icon  " onClick={handleLeft} />
          <BsArrowBarRight
            className="arrow-icon absolute top-0 right-0"
            onClick={handleRight}
          />
      </div>
      {/* dots */}
  <div className=" flex gap-1  mt-2 justify-center w-full  ">
  {data.map((d,i) => {
    if(index === i){
      return <span key={d.img} className='h-3 cursor-pointer bg-black-dark border-2 rounded-full border-gray-default w-3'></span>
    }else{
      return <span key={d.img} className='h-3 cursor-pointer  border-2 rounded-full border-gray-default w-3' onClick={() => {
        setIndex(i)
      }}></span>
    }
      })}
  </div>
    </div>
  );
};

export default Slider;
