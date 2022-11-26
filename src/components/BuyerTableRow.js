import React, { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";

const BuyerTableRow = ({ buyer, refetch }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    const permission = window.confirm("Are you sure you want to delete?");
    if (permission) {
      fetch(`${process.env.REACT_APP_serverUrl}/users/${buyer?._id}`, {
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
