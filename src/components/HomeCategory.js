import React from "react";
import { useQuery } from "@tanstack/react-query";
import HomeCard from "./HomeCard";
import Spinner from "./Spinner";

const HomeCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5001/categories").then((res) => res.json()),
  });
  let categories = [];
  if (!isLoading) {
    if (data?.status) {
      categories = data.data;
    }
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-3  sm:row-gap-6 grid-cols-1 lg:mx-40">
      {categories?.map((category) => (
        <HomeCard key={category._id} category={category}></HomeCard>
      ))}
    </div>
  );
};

export default HomeCategory;
