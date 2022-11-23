import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <section className="flex items-center h-screen p-16 bg-yellow-300 text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
              <span className="sr-only">Error</span>404
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
