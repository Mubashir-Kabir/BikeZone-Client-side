import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const items = useLoaderData().data;

  return (
    <div className="lg:mx-40 lg:my-10">
      <div className="grid gap-8">
        {items?.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
