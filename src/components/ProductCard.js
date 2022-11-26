import BookingModal from "./BookingModal";
import { useQuery } from "@tanstack/react-query";
import { GoVerified } from "react-icons/go";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

const ProductCard = ({ item }) => {
  const {
    title,
    img,
    price,
    condition,
    seller,
    number,
    location,
    info,
    purchaseYear,
    isSold,
    postTime,
  } = item;
  const { user: currentUser } = useContext(AuthContext);

  const handleReport = () => {
    const permission = window.confirm(
      "Are you sure you want to Verify the user?"
    );
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/report/${item?._id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: currentUser.email,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            return notifySuccess("Reported Successfully");
          }
          return notifyError("Something went wrong please try again");
        });
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/users?email=${seller}`).then(
        (res) => res.json()
      ),
  });
  let user = [];
  if (!isLoading) {
    if (data?.status) {
      user = data.data;
    }
  }

  if (isSold) {
    return <></>;
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-2/3 ">
        <img src={img} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="text-center text-3xl font-semibold">{title}</h2>
        <p className="text-left mb-3">{info}</p>
        <div className="flex flex-wrap gap-4 text-left">
          <p>
            <span className="font-bold text-white text-md">
              Original Price:
            </span>{" "}
            ${price.original}
          </p>
          <p>
            <span className="font-bold text-white text-md">Resale Price: </span>
            ${price.resale}
          </p>
          <p>
            <span className="font-bold text-white text-md">Condition: </span>{" "}
            {condition}
          </p>
          <p>
            <span className="font-bold text-white text-md">Location: </span>{" "}
            {location}
          </p>
          <p>
            <span className="font-bold text-white text-md">Purchase: </span>{" "}
            {purchaseYear}
          </p>
        </div>
        <h3 className="text-2xl font-semibold">Seller Info</h3>
        {isLoading ? (
          <p>loading..</p>
        ) : (
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <img
                  src={user.img}
                  alt=""
                  className="object-cover w-12 h-12 rounded-full bg-gray-500"
                />
              </div>
              <div className="text-left">
                <h4 className="font-bold flex items-center">
                  {user.name}{" "}
                  {user?.verified ? (
                    <GoVerified className="ml-2 text-cyan-600"></GoVerified>
                  ) : (
                    <></>
                  )}
                </h4>
                <span className="text-xs text-gray-600">
                  {" "}
                  {(postTime + "")?.split("T")[0]}
                </span>
                <p className="text-xs text-gray-600">{number}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-3">
          {item?.reported ? (
            <button disabled className="btn btn-error">
              Already Report
            </button>
          ) : (
            <button onClick={handleReport} className="btn btn-error">
              Report
            </button>
          )}
          <div className="card-actions justify-end">
            <BookingModal item={item}></BookingModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
