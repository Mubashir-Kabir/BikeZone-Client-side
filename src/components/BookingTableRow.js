import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BookingTableRow = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/product?id=${id}`).then((res) =>
        res.json()
      ),
  });
  let bookingProduct = [];
  if (!isLoading) {
    if (data?.status) {
      bookingProduct = data.data;
    }
  }

  if (isLoading) {
    return <tr>loading</tr>;
  }
  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="w-24 rounded">
            <img alt="" src={bookingProduct?.img} />
          </div>
        </div>
      </td>
      <td>{bookingProduct?.title}</td>
      <td>{bookingProduct?.price?.resale} tk</td>
      <th>
        {bookingProduct?.isSold ? (
          <p className=" text-success font-semibold">Paid</p>
        ) : (
          <Link to={`../../dashboard/payment/${bookingProduct?._id}`}>
            <button className="btn btn-info btn-sm">Pay</button>
          </Link>
        )}
      </th>
    </tr>
  );
};

export default BookingTableRow;
