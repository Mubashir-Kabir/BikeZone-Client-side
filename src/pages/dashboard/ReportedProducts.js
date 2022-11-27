import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/UserContext";
import ReportedProductTableRow from "../../components/ReportedProductTableRow";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const ReportedProducts = () => {
  useTitle("Reported");

  const { user } = useContext(AuthContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/reportedproducts`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: user.email,
        },
      }).then((res) => res.json()),
  });
  let products = [];
  if (!isLoading) {
    if (data?.status) {
      products = data.data;
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
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {products?.map((product) => (
            <ReportedProductTableRow
              refetch={refetch}
              key={product._id}
              product={product}
            ></ReportedProductTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedProducts;
