import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const product = useLoaderData().data;
  return <div>{<ProductCard item={product}></ProductCard>}</div>;
};

export default SingleProduct;
