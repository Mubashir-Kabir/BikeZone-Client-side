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
