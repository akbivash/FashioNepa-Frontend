
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Pay = () => {
  const cart = useSelector((s) => s.cart);
const[isLoading, setIsLoading] = useState(false)
  function handleSubmit() {
    try {
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/checkout/payment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
      })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(({ url }) =>{
          window.location = url
          // setIsLoading(false)

        })
        .catch(err => {console.log(err)
        setIsLoading(false)
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false)

    }
  }

  
  return (
    <button type="button" onClick={handleSubmit} disabled={isLoading} className= 'disabled:opacity-[0.5] bg-lime-dark max-w-[170px] my-4 text-center text-white p-3 rounded-sm' >
      Checkout
    </button>
  );
};

export default Pay;
