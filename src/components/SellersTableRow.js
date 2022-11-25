import React from "react";

const SellersTableRow = ({ seller }) => {
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
          <button className="btn btn-ghost btn-xs">Verify</button>
        )}
      </th>
    </tr>
  );
};

export default SellersTableRow;
