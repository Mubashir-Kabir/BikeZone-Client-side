import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
// import { Footer } from "../component/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <DashboardNav></DashboardNav>
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Dashboard;
