import React from "react";
import Banner from "../components/Banner";
import HomeCategory from "../components/HomeCategory";
import Slider from "../components/Slider";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div>
      <Banner></Banner>
      <div className="mx-12">
        <Slider></Slider>
      </div>
      <HomeCategory></HomeCategory>
    </div>
  );
};

export default Home;
