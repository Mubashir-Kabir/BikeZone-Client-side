import { Link } from "react-router-dom";

export const DashboardCard = ({ content, to }) => {
  return (
    <Link to={to} aria-label="View Item">
      <div className="relative bg-gray-600 overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
        <p className="flex justify-center items-center w-full h-40 md:h-64 xl:h-80">
          <span className="text-3xl font-semibold">{content}</span>
        </p>
        <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
          {/* <p className=" text-lg font-bold text-gray-100 ">
            Click to {content}
          </p> */}
        </div>
      </div>
    </Link>
  );
};
