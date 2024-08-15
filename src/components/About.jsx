import React from "react";
import { useRide } from "./Ridecontext";
import { useNavigate } from "react-router-dom";
import "./About.css";
import KashyapImage from "../uploadss/Kashyap.jpeg";

const About = () => {
  const mobileNumber = "+919898318841";
  const email = "kashyappatel2673@gmail.com";

  const handleCall = () => {
    window.location.href = `tel:${mobileNumber}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="about">
      <div className="about-box">
        <div className="about-heading">
          <div className="about-style">About Us</div>
        </div>
        <div className="about-text">
          <div className="about-textstyle">
            We are Traffic Tamers. It is a platform that makes your traveling easier
            and inexpensive, rather free. Yes! you heard that right. It is
            a tech company which primarily focuses on connecting the physical
            and digital world to facilitate movement at an ease of a click. We
            are targeting enhanced security, safety and we support your right to
            move and work freely and without fear, regardless of your gender,
            colour, religion, ability, or sexual orientation.
          </div>
        </div>
      </div>

      <div className="contact-details">
        <button className="contact-button" onClick={handleCall}>
          📞 Call Us
        </button>
        <button className="contact-button" onClick={handleEmail}>
          ✉️ Email Us
        </button>
      </div>

      <div className="photoss">
        <div className="photo-cfo">
          <img
            src={KashyapImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
      </div>

      <div className="name-cfo">
        <div className="cfo-1">Kashyap Patel</div>
      </div>
    </div>
  );
};

export default About;
