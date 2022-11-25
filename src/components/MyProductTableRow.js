import React from "react";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const MyProductTableRow = ({ product }) => {
  const handleDelete = () => {
    const permission = window.confirm("Are you sure you want to delete?");
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/products/${product?._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            return notifySuccess("Deleted Successfully");
          }
          return notifyError("Something went wrong please try again");
        });
    }
  };

  const handleAdvertize = () => {
    const permission = window.confirm("Are you sure you want to Advertize?");
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/advertize/${product?._id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            return notifySuccess("Advertize Successfully");
          }
          return notifyError("Something went wrong please try again");
        });
    }
  };

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="w-24 rounded">
            <img alt="" src={product?.img} />
          </div>
        </div>
      </td>
      <td>{product?.title}</td>
      <td>{product?.price?.resale} tk</td>
      <th>
        <button disabled className="mr-2 btn btn-xs btn-outline btn-accent">
          {product?.isSold ? (
            <span className="text-red-500 font-semibold">Sold</span>
          ) : (
            <span className="text-green-600 font-semibold">Available</span>
          )}
        </button>
        {product?.isSold ? (
          <></>
        ) : product?.advertize ? (
          <button
            // onClick={handleAdvertize}
            disabled
            className="mr-2 btn btn-info btn-xs"
          >
            Advertized
          </button>
        ) : (
          <button
            onClick={handleAdvertize}
            className="mr-2 btn btn-info btn-xs"
          >
            Advertize
          </button>
        )}
        <button onClick={handleDelete} className="btn btn-error btn-xs">
          Delete
        </button>
      </th>
    </tr>
  );
};

export default MyProductTableRow;
