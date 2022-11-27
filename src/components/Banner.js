import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage: `url("https://i.ibb.co/T4twrhh/clay-banks-76v-R6cp-Tico-unsplash.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello bikers..</h1>
          <p className="mb-5">
            Join the millions who buy and sell bikes from each other everyday in
            local communities around the country.
          </p>
          <Link to="../dashboard" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
