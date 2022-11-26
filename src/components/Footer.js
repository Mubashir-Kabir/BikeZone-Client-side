import React from "react";
import logo from "../utilities/pngwing.com (1).png";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content">
      <div>
        <img className="w-20 bg-white rounded-full p-2" src={logo} alt="" />
        <p className="font-bold">
          Bike Zone <br />A reliable bike selling platform
        </p>
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
