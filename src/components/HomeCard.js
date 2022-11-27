import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ category }) => {
  const { img, name, info, _id } = category;
  return (
    <div>
      <Link to={`../category/${_id}`} aria-label="View Item">
        <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
          <img className="object-cover w-full h-56 md:h-64 " src={img} alt="" />
          <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
            <p className="mb-4 text-lg font-bold text-gray-100">{name}</p>
            <p className="text-sm tracking-wide text-gray-300">{info}</p>
            <p className="mt-3 text-sm tracking-wide text-gray-100 ">
              Click to find
            </p>
          </div>
        </div>
      </Link>
      <h4 className="mt-2 text-xl font-semibold">{name}</h4>
    </div>
  );
};

export default HomeCard;
