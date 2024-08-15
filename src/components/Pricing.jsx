import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Pricing.css";
import { useUser } from "./UserContext";
const Pricing = () => {
  const [isamount, setamount] = useState(100);
  const [showPopup, setShowPopup] = useState(false);

  const { userInfo, setUserInfo } = useUser();

  const handlewallet = async ({ value }) => {
    setamount(value);
    const localamount = localStorage.getItem("userInfo");
    const storeddata = JSON.parse(localamount);
    let currentWalletValue = parseFloat(storeddata["wallet"]);

    currentWalletValue += parseFloat(value);

    storeddata["wallet"] = currentWalletValue.toString();

    localStorage.setItem("userInfo", JSON.stringify(storeddata));
    setUserInfo(storeddata);

    const walletdata = {
      username: userInfo.username,
      amount: parseFloat(value),
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(walletdata),
    };
    try {
      const response = await fetch(
        "https://software-gratler.onrender.com/token",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setShowPopup(true);

        // Close the popup after 1000 milliseconds (1 second)
        setTimeout(() => {
          setShowPopup(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding amount:", error);
    }
  };
  return (
    <div className="mainn">
      {showPopup && (
        <div className="popup">
          <p>{`${isamount}🪙 added to wallet!`}</p>
        </div>
      )}
      <div className="boxx">
        <div className="innerr">
          <div className="pricing-content">
            <div className="styling">BRONZE</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                10&#x1FA99;for 9$
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Sign in required
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                  clipRule="evenodd"
                />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Premium customer support
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                  clipRule="evenodd"
                />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Reduced per ride cost
              </div>
            </div>
          </div>
          <button
            className="pricing-btn"
            onClick={() => handlewallet({ value: 10 })}
          >
            Buy Now
          </button>
        </div>
        <div className="innerr">
          <div className="pricing-content">
            <div className="styling">SILVER</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                25&#x1FA99; for 22$
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Sign in required
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Premium customer support
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                  clipRule="evenodd"
                />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Reduced per ride cost
              </div>
            </div>
          </div>
          <button
            className="pricing-btn"
            onClick={() => handlewallet({ value: 25 })}
          >
            Buy Now
          </button>
        </div>
        <div className="innerr">
          <div className="pricing-content">
            <div className="styling">GOLD</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                55&#x1FA99; for 45$
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Sign in required
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Premium customer support
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path stroke="currentColor" d="M4 7.5L7 10l4-5" />
              </svg>
              <div style={{ marginLeft: "8px", fontSize: "1.5em" }}>
                Reduced cost per ride
              </div>
            </div>
          </div>
          <button
            className="pricing-btn"
            onClick={() => handlewallet({ value: 55 })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
