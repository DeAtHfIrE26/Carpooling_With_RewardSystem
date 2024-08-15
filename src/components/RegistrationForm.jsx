import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import symbol from "./Gratler.png";

const RegistrationForm = () => {
  const [last, setLast] = useState("");
  const [first, setFirst] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    last: "",
    first: "",
    username: "",
    dob: "",
    gender: "",
    password: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleRegistration = async () => {
    const newErrors = {
      last: last ? "" : "Last name is required.",
      first: first ? "" : "First name is required.",
      username: username ? "" : "Username is required.",
      dob: dob ? "" : "Date of Birth is required.",
      gender: gender ? "" : "Please select a gender.",
      password: password ? "" : "Password is required.",
      phone: phone ? "" : "Phone number is required.",
      email: email ? "" : "Email is required.",
    };

    // Update errors state
    setErrors(newErrors);

    // Check if there are any errors
    if (username.length < 5 || username.length > 12) {
      setErrors({ username: "contain 5 to 12 characters" });
    }

    const alphanumericRegex = /[a-zA-Z0-9]/;
    const specialRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (
      password.length < 8 ||
      password.length > 12 ||
      !specialRegex.test(password) ||
      !alphanumericRegex.test(password)
    ) {
      setErrors({
        password: "Password must be 8 to 12 characters and contain at least 1 special character.",
      });
    }

    if (last.length > 15) {
      setErrors({ last: "last name should be less than 15 character" });
    }

    if (first.length > 15) {
      setErrors({ first: "last name should be less than 15 character" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email) === false) {
      setErrors({ email: "not a valid email" });
    }

    const phoneRegex = /^\d{10}$/;

    if (phoneRegex.test(phone) === false) {
      setErrors({ phone: "not a valid phone number" });
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    // Send data to the server for processing
    const userData = {
      last,
      first,
      username,
      dob,
      gender,
      password,
      phone,
      email,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    try {
      const res = await fetch(
        "https://software-gratler.onrender.com/newuser",
        requestOptions
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegistration();
    }
  };

  return (
    <div className="registration">
      <div>
        <div className="registration-img">
          <img src={symbol} alt="symbol" />
          <label className="registration-gratler">Traffic Tamers</label>
          <p>
            "Carpooling made easy: Register in a blink, share the ride, and
            enjoy the journey!"
          </p>
        </div>
      </div>
      <div className="registration-box">
        <div className="registration-text">Registration</div>
        <div className="registration-input">
          <div className="input-1">
            <div>
              <input
                type="text"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="First Name"
                className="firstname"
              ></input>
              {errors.first && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "472px",
                    left: "520px",
                  }}
                  className="error"
                >
                  {errors.first}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                placeholder="Last Name"
                className="firstname"
                required
              ></input>
              {errors.last && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "472px",
                    left: "985px",
                  }}
                  className="error"
                >
                  {errors.last}
                </div>
              )}
            </div>
          </div>
          <div className="input-1">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="firstname"
                required
              ></input>
              {errors.username && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "380px",
                    left: "520px",
                  }}
                  className="error"
                >
                  {errors.username}
                </div>
              )}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="firstname"
                required
              ></input>
              {errors.password && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "380px",
                    left: "985px",
                  }}
                  className="error"
                >
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="input-1">
            <div>
              <input
                type="date"
                className="firstname"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              {errors.dob && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "285px",
                    left: "520px",
                  }}
                  className="error"
                >
                  {errors.dob}
                </div>
              )}
            </div>
            <div>
              <select
                value={gender}
                className="firstname"
                style={{ borderWidth: "2px" }}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "285px",
                    left: "985px",
                  }}
                  className="error"
                >
                  {errors.gender}
                </div>
              )}
            </div>
          </div>
          <div className="input-1">
            <div>
              <input
                type="text"
                placeholder="Phone No."
                className="firstname"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              ></input>
              {errors.phone && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "192px",
                    left: "520px",
                  }}
                  className="error"
                >
                  {errors.phone}
                </div>
              )}
            </div>
            <div>
              <input
                type="Email"
                placeholder="Email"
                className="firstname"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              {errors.email && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "192px",
                    left: "985px",
                  }}
                  className="error"
                >
                  {errors.email}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="registraion-final">
          <button className="registration-button" onClick={handleRegistration}>
            Register
          </button>
          <Link to="/" className="registrationtologin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
