import React from "react";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const BuyerTableRow = ({ buyer }) => {
  const handleDelete = () => {
    const permission = window.confirm("Are you sure you want to delete?");
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/users/${buyer?._id}`, {
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
  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="w-24 rounded">
            <img alt="" src={buyer?.img} />
          </div>
        </div>
      </td>
      <td>{buyer?.name}</td>
      <td>{buyer?.email} </td>
      <th>
        <button onClick={handleDelete} className="btn btn-error btn-xs">
          Delete
        </button>
      </th>
    </tr>
  );
};

export default BuyerTableRow;
