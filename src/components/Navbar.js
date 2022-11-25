import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { notifyError, notifySuccess } from "../utilities/sharedFunctions";
import logo from "../utilities/pngwing.com (1).png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, auth } = useContext(AuthContext);

  const logOut = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("accessToken");
        notifySuccess("Log out successful");
      })
      .catch((error) => {
        notifyError("Something went wrong. Tray again");
      });
  };

  return (
    <div className="px-4 py-4 mx-auto  bg-neutral sm:max-w-xl md:max-w-full  md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <NavLink
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <img className="w-20" src={logo} alt="" />
            <span className="ml-2 text-xl font-bold tracking-wide  uppercase">
              Bike Zone
            </span>
          </NavLink>
        </div>
        <div>
          <ul className=" items-center hidden space-x-8 lg:flex">
            <li>
              <NavLink
                to="/home"
                aria-label="Home"
                title="Home"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
                }
              >
                Home
              </NavLink>
            </li>

            {user?.uid && (
              <li>
                <NavLink
                  to="/dashboard"
                  aria-label="Dashboard"
                  title="Dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium tracking-wide text-cyan-400"
                      : "font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/blog"
                aria-label="Blog"
                title="Blog"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium tracking-wide text-cyan-400"
                    : "font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
                }
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
        {user?.uid ? (
          <div className="flex gap-2 ">
            <button
              onClick={logOut}
              className="hover:text-cyan-400 text-lg mr-3   hidden md:block"
            >
              Log Out
            </button>
            <div className="relative flex-shrink-0 mr-2">
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full border-gray-50"></span>
              <img
                src={user?.photoURL}
                alt=""
                title={user?.displayName}
                className="w-14 h-14 border rounded-full bg-white border-gray-300"
              />
            </div>
          </div>
        ) : (
          <ul className=" items-center hidden space-x-8  lg:flex">
            <li>
              <Link
                to="/log-in"
                aria-label="Log in"
                title="Log in"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-cyan-400 hover:bg-cyan-600 focus:shadow-outline focus:outline-none"
                aria-label="Register"
                title="Register"
              >
                Register
              </Link>
            </li>
          </ul>
        )}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-400 focus:bg-cyan-400"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute z-10 top-0 left-0 w-full">
              <div className="p-5 bg-base-300 border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      to="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      {/* <img className="w-16" src={logo} alt="" /> */}

                      <span className="ml-2 text-xl font-bold tracking-wide  uppercase">
                        Bike Zone
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-cyan-400" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <NavLink
                        to="/home"
                        aria-label="Home"
                        title="Home"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium tracking-wide text-cyan-400"
                            : "font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
                        }
                      >
                        Home
                      </NavLink>
                    </li>

                    {user?.uid && (
                      <li>
                        <NavLink
                          to="/dashboard"
                          aria-label="Dashboard"
                          title="Dashboard"
                          className={({ isActive }) =>
                            isActive
                              ? "font-medium tracking-wide text-cyan-400"
                              : "font-medium tracking-wide  transition-colors duration-200 hover:text-cyan-400"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}

                    <li>
                      <NavLink
                        to="/blog"
                        aria-label="Blog"
                        title="Blog"
                        className={({ isActive }) =>
                          isActive
                            ? "font-medium tracking-wide text-cyan-400"
                            : "font-medium tracking-wide transition-colors duration-200 hover:text-cyan-400"
                        }
                      >
                        Blog
                      </NavLink>
                    </li>
                    {user?.uid ? (
                      <li>
                        <button
                          onClick={logOut}
                          aria-label="Sign in"
                          title="Sign in"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-cyan-400 hover:bg-cyan-600 focus:shadow-outline focus:outline-none"
                        >
                          Log Out
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/log-in"
                            aria-label="Log in"
                            title="Sign in"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-gray-100 hover:bg-cyan-400 hover:text-white focus:shadow-outline focus:outline-none"
                          >
                            Log In
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="register"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-cyan-400 hover:bg-cyan-600 focus:shadow-outline focus:outline-none"
                            aria-label="Register"
                            title="Register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
