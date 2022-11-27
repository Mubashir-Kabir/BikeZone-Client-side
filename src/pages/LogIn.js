import React from "react";
import LoginForm from "../components/LoginForm";
import useTitle from "../hooks/useTitle";

const LogIn = () => {
  useTitle("Log in");

  return (
    <div className="grid grid-cols-1  py-20">
      <LoginForm></LoginForm>
    </div>
  );
};

export default LogIn;
