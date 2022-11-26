import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import BuyerTableRow from "../../components/BuyerTableRow";
// import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../context/UserContext";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
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
    return <p>loading...</p>;
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
            <BuyerTableRow key={buyer._id} buyer={buyer}></BuyerTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;
