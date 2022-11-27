import React from "react";
import AddProductForm from "../components/AddProductForm";
import useTitle from "../hooks/useTitle";

const AddProduct = () => {
  useTitle("Add Product");

  return (
    <div className="my-10">
      <AddProductForm></AddProductForm>
    </div>
  );
};

export default AddProduct;
