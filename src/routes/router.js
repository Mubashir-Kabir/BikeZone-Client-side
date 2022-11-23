import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AddProducts from "../pages/AddProduct";
import PrivateRoute from "../layout/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <Error></Error>,
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
        path: "add-products",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
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
      //   {
      //     path: "services/:id",
      //     loader: ({ params }) =>
      //       fetch(
      //         `https://koni-s-kitchen-server-side.vercel.app/services/${params.id}`
      //       ),
      //     element: <ServiceDetails></ServiceDetails>,
      //   },
    ],
  },
]);

export default router;
