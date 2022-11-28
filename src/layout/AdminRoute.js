import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";
import { notifyError, notifyWarn } from "../utilities/sharedFunctions";

const AdminRoute = ({ children }) => {
  const { user, loading, auth } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("accessToken");
        notifyWarn("Please log in with Admin access");
      })
      .catch((error) => {
        notifyError("Something went wrong. Tray again");
      });
  };

  //show loading until the user state comes from authState to prevent going to the log in page
  if (loading || isAdminLoading) {
    return <Spinner></Spinner>;
  }

  //after getting the user state , based on user log in or not page redirect to the page user want to visit or to the log in page
  if (user && isAdmin) {
    return children;
  } else {
    logOut();
    return (
      <Navigate to="/log-in" state={{ from: location }} replace></Navigate>
    );
  }
};

export default AdminRoute;
