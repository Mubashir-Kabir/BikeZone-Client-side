import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import { notifyError, notifyWarn } from "../utilities/sharedFunctions";

const BuyerRoute = ({ children }) => {
  const { user, loading, auth } = useContext(AuthContext);
  const location = useLocation();
  const [isSeller, isSellerLoading] = useSeller(user.email);
  const [isAdmin, isAdminLoading] = useAdmin(user.email);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("accessToken");
        notifyWarn("Please log in with Seller account");
      })
      .catch((error) => {
        notifyError("Something went wrong. Tray again");
      });
  };

  //show loading until the user state comes from authState to prevent going to the log in page
  if (loading || isSellerLoading || isAdminLoading) {
    return (
      <div className="flex h-screen items-center justify-center space-x-2">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      </div>
    );
  }

  //after getting the user state , based on user log in or not page redirect to the page user want to visit or to the log in page
  if (user && !isSeller && !isAdmin) {
    return children;
  } else {
    logOut();
    return (
      <Navigate to="/log-in" state={{ from: location }} replace></Navigate>
    );
  }
};

export default BuyerRoute;
