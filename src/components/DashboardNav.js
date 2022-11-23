import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div>
      <header className="p-4 bg-gray-100 text-gray-800">
        <div className=" mx-auto  ">
          <ul className=" flex flex-wrap gap-5 justify-center">
            <li className="flex">
              <NavLink
                to="add-product"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                Add Product
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="my-orders"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                My Orders
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="my-products"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                My Products
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="my-buyers"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                My Buyers
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to=" all sellers"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                All Sellers
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="all-buyers"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                }
              >
                All Buyers
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default DashboardNav;
