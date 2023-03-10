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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [wait, setWait] = useState(false);
  const [img, setImg] = useState("");

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
  const handleImg = (e) => {
    setWait(true);
    const tempImg = e.target.files[0];
    const formData = new FormData();
    formData.append("image", tempImg);
    //--------
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;

    fetch(imgbbUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImg(data.data.url);
        setWait(false);
      });
  };
  const notifyHandle = (data) => {
    if (data.status) {
      notifySuccess("successfully Registered ");
    } else {
      notifyError("Something went wrong");
    }
  };
  const createUserDb = (user, umail) => {
    fetch(`${process.env.REACT_APP_serverUrl}/users?email=${umail}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => notifyHandle(data));
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
        const role = event.target.accountType.value;
        const user = {
          name,
          img,
          role,
          email,
          verified: false,
        };
        createUserDb(user, email);

        requestJwtToken(result.user.email);
        updateProfile(result.user, {
          displayName: name,
          photoURL: img,
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
        const umail = result.user.email;
        const user = {
          name: result.user.displayName,
          img: result.user.photoURL,
          email: result.user.email,
          role: "Buyer",
          verified: false,
        };
        createUserDb(user, umail);

        console.log(result.user);
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
      <div className="max-w-2xl mx-auto p-8 space-y-3 rounded-xl bg-gray-600 shadow-md text-white">
        <h1 className="text-red-500">{err}</h1>

        <h1 className="text-2xl font-bold text-center">Register</h1>

        {/* form for email and password based sign up */}
        <form
          onSubmit={signUpWithEmailPass}
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
              className="w-full px-4 py-3 rounded-md border-gray-300  text-white focus:border-yellow-300"
            />
          </div>
          <div className="space-y-1 text-sm text-left">
            <p>Upload your picture</p>
            <input
              onChange={handleImg}
              required
              type="file"
              name="img"
              id="img"
              accept="image/*"
            />
          </div>
          <select
            defaultValue="Buyer"
            name="accountType"
            id="accountType"
            className="select select-bordered w-full rounded-md"
          >
            {/* <option disabled selected>
              Select Account Type
            </option> */}
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
          <div className="space-y-1 text-sm">
            <input
              required
              onChange={mailValidation}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border-gray-300   focus:border-yellow-300"
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
              className="w-full px-4 py-3 rounded-md border-gray-300   focus:border-yellow-300"
            />
          </div>
          {wait ? (
            <p>Uploading your image. Please wait...</p>
          ) : (
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md text-gray-50 bg-cyan-400 hover:bg-cyan-600"
            >
              Register
            </button>
          )}
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm ">Log in with social accounts</p>
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

        <p className="text-xs text-center sm:px-6 ">
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
