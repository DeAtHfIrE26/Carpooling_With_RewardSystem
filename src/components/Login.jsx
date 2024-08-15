import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import symbol from "./Gratler.png";

import "./Login.css";

const Login = () => {
  const [usernamein, setUsernamein] = useState("");
  const [passwordin, setPasswordin] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useUser();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (usernamein.length > 12 || usernamein.length < 5) {
      setError("username should be 5 to 12 character");
      return;
    }

    if (passwordin.length < 8 || passwordin.length > 12) {
      setError("Password should be 8 to 12 character");
      return;
    }

    try {
      setIsLoading(true);

      const loginData = {
        username: usernamein,
        password: passwordin,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      };
      const response = await fetch(
        `https://software-gratler.onrender.com/userdetail`,
        requestOptions
      );

      if (!response.ok) {
        console.log("Wrong");
        setError("Incorrect username or password");
        return;
      }

      const data = await response.json();
      console.log(data);

      await setUserInfo(data);
      navigate("/Layout");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Provide valid details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/RegistrationForm");
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-text">Login</div>
        <div className="text-holder">
          <input
            type="text"
            className="login-username"
            placeholder="Username"
            value={usernamein}
            onChange={(e) => {
              setUsernamein(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-password"
            value={passwordin}
            onChange={(e) => {
              setPasswordin(e.target.value);
            }}
          />
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                position: "absolute",
                bottom: "290px",
                left: "220px",
              }}
            >
              {error}
            </div>
          )}
        </div>
        <div className="login-signup">
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <span onClick={handleRegister} className="account-text">
            Create account
          </span>
        </div>
      </div>
      <div className="curve-box">
        <div>
          <img src={symbol} alt="symbol" />
        </div>
        <div>
          <label className="gratler-text">Traffic-Tamers</label>
        </div>
        <div>
          <label className="gratler-slogan">
            Sharing the Road, Sharing the Load !
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
