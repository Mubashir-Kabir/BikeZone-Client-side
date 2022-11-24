import React, { useContext } from "react";
import { AuthContext } from "../context/UserContext";

const BookingModal = ({ item }) => {
  const { user } = useContext(AuthContext);
  const {
    title, //------------
    image, //---------
    price,
    condition,
    seller, //-----------
    number,
    location,
    info, //------------
    purchaseYear,
    sold,
    postTime,
  } = item;
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="booking-modal" className="btn btn-primary">
        Book
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-2xl">Booking Information</h3>
          <div className="text-left p-2 my-2 text-xl font-semibold">
            <h2>
              Item: <span className="font-bold">{title}</span>
            </h2>
            <p>
              Price: <span className="font-bold">{price.resale}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                defaultValue={user.displayName}
                disabled
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                defaultValue={user.email}
                disabled
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-1 text-sm">
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
            <div className="space-y-1 text-sm">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Meeting Location"
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
              />
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="booking-modal" className="btn btn-primary">
              Cancel
            </label>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
