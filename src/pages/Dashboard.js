import React, { useContext } from "react";
import { DashboardCard } from "../components/DashboardCard";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";
import useTitle from "../hooks/useTitle";

const Dashboard = () => {
  useTitle("Dashboard");

  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  if (isAdminLoading || isSellerLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="lg:mx-36 lg:my-20">
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-2 sm:row-gap-6 grid-cols-1">
        {isSeller && (
          <>
            <DashboardCard
              to="add-product"
              content="Add Product"
            ></DashboardCard>
            <DashboardCard
              to="my-products"
              content="My Products"
            ></DashboardCard>
          </>
        )}
        {!isAdmin && !isSeller && (
          <DashboardCard to="my-orders" content="My Orders"></DashboardCard>
        )}
        {isAdmin && (
          <>
            <DashboardCard
              to="all-sellers"
              content="All Sellers"
            ></DashboardCard>
            <DashboardCard to="all-buyers" content="All Buyers"></DashboardCard>
            <DashboardCard
              to="reported-products"
              content="Reported Products"
            ></DashboardCard>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
