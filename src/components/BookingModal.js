import React from "react";

const BookingModal = ({ item }) => {
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
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
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
