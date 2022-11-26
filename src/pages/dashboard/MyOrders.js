import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import BookingTableRow from "../../components/BookingTableRow";
import { AuthContext } from "../../context/UserContext";
import Spinner from "../../components/Spinner";

const MyOrders = () => {
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
      console.log(bookingProducts);
    }
  }

  if (isLoading) {
    return <Spinner></Spinner>;
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
