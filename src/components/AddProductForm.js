import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../context/UserContext";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const AddProductForm = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  //states for user name,photo url, email,password and error
  const [err, setErr] = useState("");
  const [wait, setWait] = useState(false);
  // const [img, setImg] = useState("");

  //------------------

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/categories`).then((res) =>
        res.json()
      ),
  });
  let categories = [];
  if (!isLoading) {
    if (data?.status) {
      categories = data.data;
    }
  }

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

  const handleImg = (e) => {
    e.preventDefault();
    setWait(true);
    const tempImg = e.target.img.files[0];
    const formData = new FormData();
    formData.append("image", tempImg);
    //--------
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;

    fetch(imgbbUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // setImg(data.data.url);
        // console.log(img);
        // console.log(data.data.url);
        setWait(false);
        handlePost(e, data.data.url);
      });
  };
  const notifyHandle = (data) => {
    if (data.status) {
      notifySuccess("successfully posted ");
      navigate("../my-products");
    } else {
      notifyError("Something went wrong");
    }
  };

  const handlePost = (e, img) => {
    e.preventDefault();
    const title = e.target.name.value;
    const price = {
      original: e.target.originalPrice.value,
      resale: e.target.resalePrice.value,
    };
    const number = e.target.number.value;
    const location = e.target.location.value;
    // const info = e.target.info.value;
    const purchaseYear = e.target.purchaseYear.value;
    const isSold = false;
    const current = new Date();
    const postTime = current.toISOString();
    const seller = user?.email;
    const category = e.target.category.value;
    const condition = e.target.condition.value;
    const advertize = false;

    const product = {
      title,
      price,
      number,
      location,
      info,
      purchaseYear,
      isSold,
      postTime,
      seller,
      category,
      condition,
      img,
      advertize,
    };
    e.target.reset();
    fetch(`${process.env.REACT_APP_serverUrl}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        applieremail: user.email,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => notifyHandle(data));
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-8 space-y-3 rounded-xl bg-gray-600 shadow-md text-gray-800">
        <h1 className="text-red-500">{err}</h1>

        <h1 className="text-2xl text-white font-bold text-center">
          Add Bike for sale
        </h1>

        <form
          onSubmit={handleImg}
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
              className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
            />
          </div>
          <select
            defaultValue="Standard"
            name="category"
            id="category"
            className="select text-white select-bordered w-full rounded-md"
          >
            {!isLoading &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <div className="">
            <textarea
              required
              onChange={handleTextArea}
              rows="3"
              name="info"
              id="info"
              //   cols="50"
              placeholder="Bike details..."
              className="p-4 w-full rounded-md resize-none text-white"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="originalPrice"
                id="originalPrice"
                placeholder="Original Price"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="resalePrice"
                id="resalePrice"
                placeholder="Resale Price"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <select
              defaultValue="Good"
              name="condition"
              id="condition"
              className="select text-white select-bordered w-full rounded-md"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="purchaseYear"
                id="purchaseYear"
                placeholder="purchase Year"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
              />
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-md text-white font-semibold">
              Picture of your Bike
            </p>
            <input
              className="text-white"
              required
              type="file"
              name="img"
              id="img"
              accept="image/*"
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
                className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                required
                type="text"
                name="number"
                id="number"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
              />
            </div>
          </div>

          <div className="block w-full  text-center rounded-md text-gray-50 bg-gray-600">
            {wait ? (
              <p className="p-3">image uploading. please wait..</p>
            ) : (
              <button
                className="block w-full p-3 text-center rounded-md text-gray-50 bg-cyan-400 hover:bg-cyan-600"
                type="submit"
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
