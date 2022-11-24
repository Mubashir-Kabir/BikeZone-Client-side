import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/UserContext";
import {
  notifyError,
  notifySuccess,
  requestJwtToken,
} from "../utilities/sharedFunctions";

const AddProductForm = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  //states for user name,photo url, email,password and error
  const [err, setErr] = useState("");

  //------------------

  const [info, setInfo] = useState("");
  const handleTextArea = (e) => {
    if (e.target.value.length < 10) {
      setInfo("");
      setErr("Too short for description");
      return;
    }
    setErr("");
    setInfo(e.target.value);
  };
  const handlePost = () => {
    const product = {};
    console.log(product);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-8 space-y-3 rounded-xl bg-gray-200 shadow-md text-gray-800">
        <h1 className="text-red-500">{err}</h1>

        <h1 className="text-2xl font-bold text-center">Add Bike for sale</h1>

        {/* form for email and password based sign up */}
        <form
          onSubmit={handlePost}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Bike Name"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <div className="">
            <textarea
              required
              onChange={handleTextArea}
              rows="3"
              //   cols="50"
              placeholder="Bike details..."
              className="p-4 w-full rounded-md resize-none text-gray-800 "
            ></textarea>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="original price"
                id="original price"
                placeholder="Original Price"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="resale price"
                id="resale price"
                placeholder="Resale Price"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="original price"
                id="original price"
                placeholder="Condition"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="purchase year"
                id="purchase year"
                placeholder="purchase Year"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <input
              required
              type="url"
              name="photoURL"
              id="photoURL"
              placeholder="link of your picture "
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="phone number"
                id="phone number"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-md text-gray-50 bg-cyan-400 hover:bg-cyan-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
