import React from "react";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const SellersTableRow = ({ seller }) => {
  const handleVerify = () => {
    const permission = window.confirm(
      "Are you sure you want to Verify the user?"
    );
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/userverify/${seller?._id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            return notifySuccess("Verified Successfully");
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
            <img alt="" src={seller?.img} />
          </div>
        </div>
      </td>
      <td>{seller?.name}</td>
      <td>{seller?.email} tk</td>
      <th>
        {seller?.verified ? (
          <button disabled className="btn btn-ghost btn-xs">
            Verified
          </button>
        ) : (
          <button onClick={handleVerify} className="btn btn-ghost btn-xs">
            Verify
          </button>
        )}
        <button className="btn btn-ghost btn-xs">Delete</button>
      </th>
    </tr>
  );
};

export default SellersTableRow;
