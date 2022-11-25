import React from "react";
import { useQuery } from "@tanstack/react-query";
import SellersTableRow from "../../components/SellersTableRow";

const AllSellers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/allusers?role=Seller`).then(
        (res) => res.json()
      ),
  });
  let sellers = [];
  if (!isLoading) {
    if (data?.status) {
      sellers = data.data;
      console.log(sellers);
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
          {sellers?.map((seller) => (
            <SellersTableRow key={seller._id} seller={seller}></SellersTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
