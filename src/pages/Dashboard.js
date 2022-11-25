import React, { useContext } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { AuthContext } from "../context/UserContext";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div className="lg:mx-36 lg:my-20">
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-2 sm:row-gap-6 grid-cols-1">
        <DashboardCard to="add-product" content="Add Product"></DashboardCard>
        <DashboardCard to="my-orders" content="My Orders"></DashboardCard>
        <DashboardCard to="my-products" content="My Products"></DashboardCard>
        {isAdmin && (
          <>
            <DashboardCard
              to="all-sellers"
              content="All Sellers"
            ></DashboardCard>
            <DashboardCard to="all-buyers" content="All Buyers"></DashboardCard>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
