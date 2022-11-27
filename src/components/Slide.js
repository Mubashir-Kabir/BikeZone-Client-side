import React from "react";
import { Link } from "react-router-dom";

const Slide = ({ product }) => {
  return (
    <div
      className="hero h-[50vh]"
      style={{
        backgroundImage: `url("${product?.img}")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{product?.title}</h1>
          <p className="mb-5">{product?.info}</p>
          <Link to="../dashboard" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
