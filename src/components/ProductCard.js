import BookingModal from "./BookingModal";
import { useQuery } from "@tanstack/react-query";
import { GoVerified } from "react-icons/go";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";
import { useContext, useState } from "react";
import { AuthContext } from "../context/UserContext";
// import { useFetcher } from "react-router-dom";

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

  // //testing
  // const fetcher = useFetcher();
  // useEffect(() => {
  //   fetcher.load("/some/route");
  // }, [fetcher]);
  // //testing
  const [isReported, setIsReported] = useState(item?.reported);

  const timeFormate = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
  });
  const dateFormate = new Intl.DateTimeFormat("default", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const { user: currentUser } = useContext(AuthContext);

  const handleReport = () => {
    const permission = window.confirm(
      "Are you sure you want to Report this item?"
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
            setIsReported(true);
            notifySuccess("Reported Successfully");
            return;
          }
          return notifyError("Something went wrong please try again");
        });
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: [seller],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/users?email=${seller}`).then(
        (res) => res.json()
      ),
  });
  let postedBy = [];
  if (!isLoading) {
    if (data?.status) {
      postedBy = data.data;
    }
  }

  if (isSold) {
    return <></>;
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-1/2 ">
        <img src={img} alt="Album" />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="text-center text-3xl font-semibold">{title}</h2>
        <p className="text-left mb-3">{info}</p>
        <div className=" gap-4 text-left">
          <p>
            <span className="font-bold text-white text-md">
              Original Price:
            </span>{" "}
            ${price?.original}
          </p>
          <p>
            <span className="font-bold text-white text-md">Resale Price: </span>
            ${price?.resale}
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
                  src={postedBy?.img}
                  alt=""
                  className="object-cover w-12 h-12 rounded-full bg-gray-500"
                />
              </div>
              <div className="text-left">
                <h4 className="font-bold flex items-center">
                  {postedBy?.name}{" "}
                  {postedBy?.verified ? (
                    <GoVerified className="ml-2 text-cyan-600"></GoVerified>
                  ) : (
                    <></>
                  )}
                </h4>
                <p>
                  Posted:
                  <span className="text-xs text-gray-500 mx-2">
                    {timeFormate.format(new Date(postTime))}
                  </span>
                  <span className="text-xs text-gray-500">
                    {dateFormate.format(new Date(postTime))}
                  </span>
                </p>
                <p>
                  Contact:
                  <span className="text-xs text-gray-500 mx-2">{number}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-3">
          {isReported ? (
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
