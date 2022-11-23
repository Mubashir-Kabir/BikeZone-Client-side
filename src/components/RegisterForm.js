import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
import {
  notifyError,
  notifySuccess,
  requestJwtToken,
} from "../utilities/sharedFunctions";

const RegisterForm = () => {
  const { auth } = useContext(AuthContext);

  //auth providers
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  //getting location for redirect user where came from
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //states for user name,photo url, email,password and error
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  //validate name. name cant't be empty
  const nameValidation = (e) => {
    if (e.target.value === "") {
      setErr("Please tell us your name");
      return;
    }
    if (!/.{4,}/.test(e.target.value)) {
      setErr("Please tell us your full name");
      return;
    }
    setErr("");
    setName(e.target.value);
  };

  //photo url validation
  const urlValidation = (e) => {
    if (e.target.value === "") {
      return;
    }
    if (
      !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
        e.target.value
      )
    ) {
      setErr("Invalid URL please try another");
      return;
    }
    setErr("");
    setUrl(e.target.value);
  };

  //email validation
  const mailValidation = (e) => {
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    if (mail) {
      setErr("");
      setEmail(e.target.value);
    } else {
      setErr("Invalid Email Address!!");
    }
  };

  //password validation (at least 6 characters, one digit and one special character )
  const passValidation = (e) => {
    if (!/.{6,}/.test(e.target.value)) {
      setErr("password should be at least 6 charecter!!");
      return;
    }
    if (!/(?=.*?[0-9])/.test(e.target.value)) {
      setErr("password should be at least 1 digit!!");
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(e.target.value)) {
      setErr("password should be at least 1 special character!!");
      return;
    }
    setErr("");
    setPassword(e.target.value);
  };

  //email and password based sign up handle
  const signUpWithEmailPass = (event) => {
    event.preventDefault();
    if (!name) {
      setErr("Please provide your full name");
      return;
    }
    if (!email) {
      setErr("Please provide your Email");
      return;
    }
    if (!password) {
      setErr("Please set a password");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setErr("");
        notifySuccess("Successfully Registered");
        requestJwtToken(result.user.email);
        updateProfile(result.user, {
          displayName: name,
          photoURL: url,
        })
          .then(() => {
            navigate(from, { replace: true });
          })
          .catch((error) => {
            notifyError("profile update failed ");
            navigate(from, { replace: true });
          });
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          setErr("The Email is already registered");
          return;
        }
        notifyError(errorMessage.slice(22, -2));
      });
  };

  //gmail sign up handle
  const signUpWithGmail = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        notifySuccess("log-in Successful");
        requestJwtToken(result.user.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        notifyError("Log-in failed !!");
      });
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-8 space-y-3 rounded-xl bg-gray-200 shadow-md text-gray-800">
        <h1 className="text-red-500">{err}</h1>

        <h1 className="text-2xl font-bold text-center">Register</h1>

        {/* form for email and password based sign up */}
        <form
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <input
              required
              onChange={nameValidation}
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <div className="space-y-1 text-sm">
            <input
              onChange={urlValidation}
              type="url"
              name="photoURL"
              id="photoURL"
              placeholder="link of your picture "
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <div className="space-y-1 text-sm">
            <input
              required
              onChange={mailValidation}
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
              onChange={passValidation}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-yellow-300"
            />
          </div>
          <button
            onClick={signUpWithEmailPass}
            className="block w-full p-3 text-center rounded-md text-gray-50 bg-cyan-400 hover:bg-cyan-600"
          >
            Register
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-600">
            Log in with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>

        {/* social media log in icons */}
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
          Already have an account?
          <Link
            to="/log-in"
            className="text-cyan-500 hover:underline hover:text-cyan-600 ml-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
