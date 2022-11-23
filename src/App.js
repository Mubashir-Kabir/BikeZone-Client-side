import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import router from "./routes/router";

function App() {
  return (
    <div className="App ">
      <ToastContainer></ToastContainer>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
