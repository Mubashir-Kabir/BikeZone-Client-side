import BookingModal from "./BookingModal";
import { useQuery } from "@tanstack/react-query";

const ProductCard = ({ item }) => {
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
    isSold,
    postTime,
  } = item;

  const { data, isLoading } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverUrl}/users?email=${seller}`).then(
        (res) => res.json()
      ),
  });
  let user = [];
  if (!isLoading) {
    if (data?.status) {
      user = data.data;
    }
  }

  if (isSold) {
    return <></>;
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="text-center text-3xl font-semibold">{title}</h2>
        <p className="text-left mb-3">{info}</p>
        <div className="flex flex-wrap gap-4 text-left">
          <p>Original Price:${price.original}</p>
          <p>Resale Price:${price.resale}</p>
          <p>Condition: {condition}</p>
          <p>Location: {location}</p>
          <p>Purchase: {purchaseYear}</p>
        </div>
        <h3 className="text-2xl font-semibold">Posted By</h3>
        {isLoading ? (
          <p>loading..</p>
        ) : (
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <img
                  src={user.img}
                  alt=""
                  className="object-cover w-12 h-12 rounded-full bg-gray-500"
                />
              </div>
              <div className="text-left">
                <h4 className="font-bold">{user.name}</h4>
                <span className="text-xs text-gray-600">
                  {" "}
                  {(postTime + "")?.split("T")[0]}
                </span>
                <p className="text-xs text-gray-600">{number}</p>
              </div>
            </div>
          </div>
        )}
        <div className="card-actions justify-end">
          <BookingModal item={item}></BookingModal>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
