
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Pay = () => {
  const cart = useSelector((s) => s.cart);
  function handleSubmit() {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/checkout/payment`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    }).then(res => {
      if (res.ok) return res.json()

    }).then(({ url }) => window.location = url

    )
      .catch(err => console.log(err))
  }
  return (
    <button type="button" onClick={handleSubmit} className='bg-lime-dark max-w-[170px] my-4 text-center text-white p-3 rounded-sm' >
      Checkout
    </button>
  );
};

export default Pay;
