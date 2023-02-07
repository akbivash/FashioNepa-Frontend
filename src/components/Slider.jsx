import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { sliderItems } from "../assets/data";


const Slider = () => {
  const [index, setIndex] = useState(0);
  const sliderContainerRef = useRef();

//   useEffect(() => {
//     sliderContainerRef.current.style.transform = `translateX(calc(-${
//      100 * index
//     }%))`;
 
// sliderContainerRef.current.style.transition = '1s'
// let intervelID =  setInterval(() => {
// setIndex(prev => prev + 1)
// if(index === sliderItems.length - 1){
//   setIndex(0)
// }
// },4000)
//     return () => {
//       clearInterval(intervelID)
//     };
//   }, [index]);

 

  const handleLeft = () => {
  if(index !== 0){
    setIndex((prev) => prev - 1);
  }else{
    setIndex(sliderItems.length - 1)
  }
  };
  const handleRight = () => {
  if(index < sliderItems.length - 1){
    setIndex((prev) => prev + 1);
  }else{
    setIndex(0)
  }
  };


  return (
    <div className="  overflow-hidden h-full  w-full relative">
      <div
        className={`flex  h-[400px] min-w-full translate-x-0 `}
        ref={sliderContainerRef}
      >
        {sliderItems.map((item) => {
          return (
            <div key={item.id} className={` min-w-full`}>
              <img
                src={item.img}
                alt={sliderItems.title}
                className=" h-full object-cover w-full  lg:w-[80%] mx-auto"
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
  {sliderItems.map((d,i) => {
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
