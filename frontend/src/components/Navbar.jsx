import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Thay useHistory bằng useNavigate
import { assets } from "../../../backend/statics/assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, loginStatus, setLoginStatus } =
    useContext(ShopContext);
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleLogout = () => {
    setLoginStatus(false);
    navigate("/");
    window.location.reload(); // Refresh lại trang
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Link to={"/collection"}>
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search-icon"
          />
        </Link>

        <div className="group relative">
          {loginStatus === false ? (
            <Link to="/login">
              <img
                src={assets.enter_icon}
                className="w-5 cursor-pointer"
                alt="enter_icon"
                onClick={loginStatus ? handleLogout : null}
              />
            </Link>
          ) : (
            <div className="flex items-center justify-between py-5 font-medium gap-6">
              <Link to="/cart" className="relative">
                <img
                  src={assets.cart_icon}
                  alt="cart_icon"
                  className="w-5 min-w-5"
                />
                <p className="absolute top-[-8px] right-[-8px] w-5 h-5 flex items-center justify-center bg-black text-white text-xs font-bold rounded-full">
                  {getCartCount()}
                </p>
              </Link>
              <Link to="/">
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer "
                  alt="logout_icon"
                  onClick={loginStatus ? handleLogout : null}
                />
              </Link>
              <Link to="/">
                <img
                  src={assets.logout_icon}
                  className="w-5 cursor-pointer"
                  alt="logout_icon"
                  onClick={loginStatus ? handleLogout : null}
                />
              </Link>
            </div>
          )}
        </div>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>
      {/*Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-4 p-3 cursor-pointer">
            <img
              onClick={() => setVisible(false)}
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="dropdown_icon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
