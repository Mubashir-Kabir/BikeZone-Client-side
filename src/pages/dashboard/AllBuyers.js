import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import BuyerTableRow from "../../components/BuyerTableRow";
// import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../context/UserContext";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const AllBuyers = () => {
  useTitle("Buyers");

  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/allusers?role=Buyer`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: user.email,
        },
      }).then((res) => res.json()),
  });
  let buyers = [];
  if (!isLoading) {
    if (data?.status) {
      buyers = data.data;
    }
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!buyers?.length) {
    return (
      <div className="min-h-[45vh] flex justify-center items-center">
        <h1 className="text-3xl font-semibold">
          No buyers account right now!!
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
          {buyers?.map((buyer) => (
            <BuyerTableRow
              refetch={refetch}
              key={buyer._id}
              buyer={buyer}
            ></BuyerTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;
