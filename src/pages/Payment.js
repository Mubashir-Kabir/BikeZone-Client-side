import React from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
  const product = useLoaderData();
  console.log(product?.data?.price?.resale);
  return (
    <div>
      <h1>this is payment page</h1>
    </div>
  );
};

export default Payment;
