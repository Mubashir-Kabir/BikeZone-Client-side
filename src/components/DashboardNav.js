import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

const DashboardNav = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  return (
    <div>
      <header className="p-4 bg-gray-100 text-gray-800">
        <div className=" mx-auto  ">
          <ul className=" flex flex-wrap gap-5 justify-center">
            {isSeller && (
              <>
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
              </>
            )}
            {!isAdmin && !isSeller && (
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
            )}

            {isAdmin && (
              <>
                <li className="flex">
                  <NavLink
                    to="all-sellers"
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
                <li className="flex">
                  <NavLink
                    to="reported-products"
                    className={({ isActive }) =>
                      isActive
                        ? "font-medium tracking-wide text-cyan-400"
                        : "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-cyan-400"
                    }
                  >
                    Reported Products
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default DashboardNav;
