import React from "react";
import HomeCard from "./HomeCard";

const HomeCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Standard",
      img: "https://di-uploads-pod30.dealerinspire.com/ridenow/uploads/2021/02/2020-Yamaha-MT-07.jpg",
      info: "this is the category of standard bikes. you can find your dream bike",
    },
    {
      id: 2,
      name: "Electric",
      img: "https://di-uploads-pod30.dealerinspire.com/ridenow/uploads/2021/02/2020-Yamaha-MT-07.jpg",
      info: "this is the category of standard bikes. you can find your dream bike",
    },
    {
      id: 3,
      name: "Scooty",
      img: "https://di-uploads-pod30.dealerinspire.com/ridenow/uploads/2021/02/2020-Yamaha-MT-07.jpg",
      info: "this is the category of standard bikes. you can find your dream bike",
    },
  ];
  return (
    <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-3  sm:row-gap-6 grid-cols-1 lg:mx-40">
      {categories.map((category) => (
        <HomeCard key={category.id} category={category}></HomeCard>
      ))}
    </div>
  );
};

export default HomeCategory;
