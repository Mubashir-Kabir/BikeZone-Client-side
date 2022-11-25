import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AddProduct from "../pages/AddProduct";
import PrivateRoute from "../layout/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Error from "../pages/Error";
import DashboardLayout from "../layout/DashboardLayout";
import MyOrders from "../pages/dashboard/MyOrders";
import MyProducts from "../pages/dashboard/MyProducts";
import AllSellers from "../pages/dashboard/AllSellers";
import AllBuyers from "../pages/dashboard/AllBuyers";
import Products from "../pages/Products";
import Payment from "../pages/Payment";
import AdminRoute from "../layout/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },

      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "log-in",
        element: <LogIn></LogIn>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "category/:id",
        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_serverUrl}/products?category=${params.id}`
          ),
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "my-products",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "all-sellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "All-buyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "payment/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_serverUrl}/product?id=${params.id}`),
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
