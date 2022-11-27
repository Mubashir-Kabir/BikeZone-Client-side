import React from "react";
import HomeCategory from "../components/HomeCategory";
import Slider from "../components/Slider";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div>
      <h1>this is home</h1>
      <Slider></Slider>
      <HomeCategory></HomeCategory>
    </div>
  );
};

export default Home;
