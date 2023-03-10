import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import BookingTableRow from "../../components/BookingTableRow";
import { AuthContext } from "../../context/UserContext";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const MyOrders = () => {
  useTitle("Orders");

  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/bookings?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });
  let bookingProducts = [];
  if (!isLoading) {
    if (data?.status) {
      bookingProducts = data.data;
    }
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!bookingProducts?.length) {
    return (
      <div className="min-h-[45vh] flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Nothing booked or buy yet!!</h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {bookingProducts.map((product) => (
            <BookingTableRow
              key={product._id}
              id={product.productId}
            ></BookingTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
