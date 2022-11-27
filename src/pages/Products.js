import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useTitle from "../hooks/useTitle";

const Products = () => {
  useTitle("Bikes");

  const items = useLoaderData().data;

  if (!items?.length) {
    return (
      <div className="min-h-[45vh] flex justify-center items-center">
        <h1 className="text-3xl font-semibold">
          No Products in this Category!!
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:mx-40 lg:my-10">
        <h2 className="lg:my-10 mb-6 bg-white text-black px-2 py-3 rounded-md mx-3 text-2xl font-semibold">
          All Bikes In this Category
        </h2>
        <div className="grid gap-8">
          {items?.map((item) => (
            <ProductCard key={item._id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
