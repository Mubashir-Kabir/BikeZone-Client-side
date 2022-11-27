import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import logo from "../utilities/pngwing.com (1).png";

const Error = () => {
  useTitle("Not found");

  return (
    <div>
      <section className="flex items-center h-screen p-16 ">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="relative mb-8 font-extrabold text-9xl text-gray-400">
              <span className="sr-only">Error</span>
              <span className="lg:hidden">404</span>
              <img
                className="lg:absolute w-72 lg:right-1 lg:bottom-2  "
                src={logo}
                alt=""
              />
              <span className="hidden lg:block">
                <span className="mr-16">4</span> <span>4</span>
              </span>
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-600">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to="/home"
              className="px-8 py-3 font-semibold rounded bg-cyan-400 text-gray-50 hover:bg-cyan-600"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
