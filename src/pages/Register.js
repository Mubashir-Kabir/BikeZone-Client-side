import React from "react";
import RegisterForm from "../components/RegisterForm";
import useTitle from "../hooks/useTitle";

const Register = () => {
  useTitle("Register");

  return (
    <div className="grid grid-cols-1  py-20">
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default Register;
