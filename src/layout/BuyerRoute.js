import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import { notifyWarn } from "../utilities/sharedFunctions";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const buyerHandle = () => {
    notifyWarn("Please Use a buyer account");
  };

  //show loading until the user state comes from authState to prevent going to the log in page
  if (loading || isSellerLoading || isAdminLoading) {
    return <Spinner></Spinner>;
  } else {
    //after getting the user state , based on user log in or not page redirect to the page user want to visit or to the log in page
    if (user && !isSeller && !isAdmin) {
      return children;
    } else {
      buyerHandle();
      return <Navigate to="/" state={{ from: location }} replace></Navigate>;
    }
  }
};

export default BuyerRoute;
