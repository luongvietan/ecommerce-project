import React from "react";
import { assets } from "../../../backend/statics/assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Welcome to Fuble, your ultimate destination for premium soccer gear.
            We offer a wide range of products designed for both professional and
            amateur players, ensuring you have everything you need to excel on
            the field. Shop with Fuble and elevate your game to the next level!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/collection">
              <li>Collection</li>
            </Link>
            <Link to="/about">
              <li>About Us</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84 384 398 634</li>
            <li>luongvietan.231123@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 ©duelurker - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
