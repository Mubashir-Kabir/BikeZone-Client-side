import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import useTitle from "../hooks/useTitle";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  useTitle("Payment");

  const product = useLoaderData();
  const { title, price } = product.data;
  console.log(title);
  console.log(product?.data?.price?.resale);
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-8">
        Payment for <span className="font-bold text-3xl">"{title}"</span>
      </h1>
      <h1 className="text-2xl font-semibold mt-8">
        Price: <span className="font-bold text-3xl">"{price?.resale} TK"</span>
      </h1>
      <div className="w-96 my-12 mx-auto">
        <Elements stripe={stripePromise}>
          <PaymentForm product={product}></PaymentForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
