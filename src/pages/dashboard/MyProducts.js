import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/UserContext";
import MyProductTableRow from "../../components/MyProductTableRow";
import Spinner from "../../components/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: [user],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverUrl}/userproduct?seller=${user.email}`
      ).then((res) => res.json()),
  });
  let myProducts = [];
  if (!isLoading) {
    if (data?.status) {
      myProducts = data.data;
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
          {/* <!-- row  --> */}
          {myProducts?.map((product) => (
            <MyProductTableRow
              key={product._id}
              product={product}
              refetch={refetch}
            ></MyProductTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
