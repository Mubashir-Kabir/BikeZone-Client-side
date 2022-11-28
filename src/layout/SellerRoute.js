import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/UserContext";
import useSeller from "../hooks/useSeller";
import { notifyWarn } from "../utilities/sharedFunctions";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  const sellerHandle = () => {
    notifyWarn("Please Use a seller account");
  };

  //show loading until the user state comes from authState to prevent going to the log in page
  if (loading || isSellerLoading) {
    return <Spinner></Spinner>;
  }

  //after getting the user state , based on user log in or not page redirect to the page user want to visit or to the log in page
  if (user && isSeller) {
    return children;
  } else {
    sellerHandle();
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
};

export default SellerRoute;
