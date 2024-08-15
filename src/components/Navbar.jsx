import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import symbol from "./Gratler.png";
import { useUser } from "./UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo } = useUser();

  const location = useLocation();
  const isLoginRoute = location.pathname === "/";
  const isRegisterRoute = location.pathname === "/RegistrationForm";
  const [wallet, setWallet] = useState(0);
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userInfo")) || {};
    setWallet(storedUserData.wallet || 0);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserData = JSON.parse(localStorage.getItem("userInfo")) || {};
      setWallet(storedUserData.wallet || 0);
    };

    const intervalId = setInterval(() => {
      handleStorageChange();
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  const shouldRenderNavbar = !isLoginRoute && !isRegisterRoute;

  const logout = () => {
    localStorage.removeItem("userImage");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return shouldRenderNavbar ? (
    <div className="navbar">
      <div className="symbol">
        <img src={symbol} alt="symbol" />
      </div>
      <div className="navbar-content">
        <Link to="/Layout" className="home">
          Home
        </Link>
        <Link to="/About" className="about-us">
          About Us
        </Link>
        <Link to="/Profile" className="profile">
          Profile
        </Link>
        <Link to="/Pricing" className="pricing">
          Pricing
        </Link>
      </div>

      <div className="navbar-button">
        <Link
          to="/Pricing"
          classname="wallet-symbol"
          style={{
            width: "63px",
            display: "flex",
            paddingTop: "8px",
            textDecoration: "none",
            color: "black",
          }}
        >
          <>&#x1FA99;</>
          <div>{wallet}</div>
        </Link>

        <button className="signup" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default Navbar;
