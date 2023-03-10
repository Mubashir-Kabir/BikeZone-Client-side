import React, { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const SellersTableRow = ({ seller, refetch }) => {
  const { user } = useContext(AuthContext);

  const handleVerify = () => {
    const permission = window.confirm(
      "Are you sure you want to Verify the user?"
    );
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/userverify/${seller?._id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: user.email,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            refetch();
            return notifySuccess("Verified Successfully");
          }
          return notifyError("Something went wrong please try again");
        });
    }
  };
  const handleDelete = () => {
    const permission = window.confirm("Are you sure you want to delete?");
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/users/${seller?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          applieremail: user.email,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            refetch();
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
            <img alt="" src={seller?.img} />
          </div>
        </div>
      </td>
      <td>{seller?.name}</td>
      <td>{seller?.email} </td>
      <th>
        {seller?.verified ? (
          <button disabled className="btn btn-ghost btn-xs">
            Verified
          </button>
        ) : (
          <button onClick={handleVerify} className="btn btn-info mr-2 btn-xs">
            Verify
          </button>
        )}
        <button onClick={handleDelete} className="btn btn-error btn-xs">
          Delete
        </button>
      </th>
    </tr>
  );
};

export default SellersTableRow;
