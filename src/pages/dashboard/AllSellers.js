import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import SellersTableRow from "../../components/SellersTableRow";
import { AuthContext } from "../../context/UserContext";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const AllSellers = () => {
  useTitle("Sellers");

  const { user } = useContext(AuthContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/allusers?role=Seller`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: user.email,
        },
      }).then((res) => res.json()),
  });
  let sellers = [];
  if (!isLoading) {
    if (data?.status) {
      sellers = data.data;
      console.log(sellers);
    }
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!sellers?.length) {
    return (
      <div className="min-h-[45vh] flex justify-center items-center">
        <h1 className="text-3xl font-semibold">
          No sellers account right now!!
        </h1>
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
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {sellers?.map((seller) => (
            <SellersTableRow
              refetch={refetch}
              key={seller._id}
              seller={seller}
            ></SellersTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
