import React from "react";

const BuyerTableRow = ({ buyer }) => {
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
      <td>{buyer?.email} tk</td>
      <th>
        {buyer?.verified ? (
          <button disabled className="btn btn-ghost btn-xs">
            Verified
          </button>
        ) : (
          <button className="btn btn-ghost btn-xs">Delete</button>
        )}
      </th>
    </tr>
  );
};

export default BuyerTableRow;
