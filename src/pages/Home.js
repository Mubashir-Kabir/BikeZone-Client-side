import React from "react";
import Banner from "../components/Banner";
import HomeCategory from "../components/HomeCategory";
import Slider from "../components/Slider";
import Stats from "../components/Stats";
import Steps from "../components/Steps";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div>
      <Banner></Banner>
      <div className="mx-12 my-12">
        <Slider></Slider>
      </div>
      <div className="my-8">
        <h2 className="lg:my-10 mb-6 bg-gray-200 text-black px-2 py-3 rounded-md mx-3 text-2xl font-semibold">
          Categories
        </h2>
        <HomeCategory></HomeCategory>
      </div>
      <div>
        <Steps></Steps>
      </div>
      <div>
        <Stats></Stats>
      </div>
    </div>
  );
};

export default Home;
