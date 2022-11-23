import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
import {
  notifyError,
  notifySuccess,
  requestJwtToken,
} from "../utilities/sharedFunctions";

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  //Auth providers
  const googleProvider = new GoogleAuthProvider();

  //state for error
  const [error, SetError] = useState("");
  //state for email
  const [email, setEmail] = useState("");

  //getting location for redirect user where came from
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // setting email
  const emailHandle = (e) => {
    setEmail(e.target.value);
  };

  //log in with email and password handle
  const passLogIn = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        notifySuccess("Log-in Successful");
        requestJwtToken(email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          notifyError("User not found along with this email. Please register");
          return;
        }
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          notifyError("Wrong Password");
          return;
        }
        SetError(errorMessage.slice(22, -2));
      });
  };

  //log in with gmail handle
  const signUpWithGmail = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        notifySuccess("Log-in Successful");
        requestJwtToken(result.user.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        notifyError("Log-in Failed !!");
      });
  };

  //reset password handle
  const forgotPass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notifySuccess("Password reset email has been sent");
      })
      .catch((error) => {
        notifyError("Something went wrong!!");
      });
  };

  return (
    <div>
      {/* Log in form */}
      <div className="max-w-2xl mx-auto p-8 space-y-3 rounded-xl bg-gray-200 shadow-md text-gray-800">
        <p className="text-red-500">{error}</p>

        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <form
          onSubmit={passLogIn}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <input
              onChange={emailHandle}
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <div className="space-y-1 text-sm">
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
            <div className="flex justify-end text-xs text-cyan-500 hover:underline hover:text-cyan-600">
              <span className="hover:cursor-pointer" onClick={forgotPass}>
                Forgot Password?
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-md transition duration-200 text-gray-50 bg-cyan-400 hover:bg-cyan-600"
          >
            Log in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-600">
            Log in with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={signUpWithGmail}
            aria-label="Log in with Google"
            className="p-3 rounded-sm text-3xl"
          >
            <FcGoogle></FcGoogle>
          </button>
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className=" text-cyan-500 hover:underline hover:text-cyan-600 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
