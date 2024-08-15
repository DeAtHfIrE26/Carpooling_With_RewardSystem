import React from "react";
import { useState } from "react";
import "./Driverbill.css";
import { useUser } from "./UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const Passengerbill = () => {
  const userInfo = useUser();
  const { driverdata } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = currentDate.toLocaleDateString();
  const billdata = JSON.parse(decodeURIComponent(driverdata));
  const navigate = useNavigate();
  const [distanceTravelled, setDistanceTravelled] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [popuptext, setpopuptext] = useState("");
  const { setUserInfo } = useUser();

  const drivername = encodeURIComponent(JSON.stringify(billdata.driver));

  const formattedDistanceTravelled = parseInt(distanceTravelled);

  const handleconfirm = async () => {
    const confirmRide = {
      driverUsername: billdata.driver,
      passengerUsername: billdata.username,
      from: billdata.from,
      to: billdata.to,
      date: formattedDate,
      passenger: billdata.seat,
      distance: distanceTravelled,
      amount: billdata.amount,
      carno: billdata.carno,
    };

    if (userInfo.userInfo.wallet < billdata.amount) {
      setpopuptext("Not Enough Balance");
      setShowPopup(true);

      // Close the popup after 1000 milliseconds (1 second)
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
      return;
    } else {
      const localamount = localStorage.getItem("userInfo");
      const storeddata = JSON.parse(localamount);
      let currentWalletValue = parseFloat(storeddata["wallet"]);

      currentWalletValue -= parseFloat(billdata.amount);

      storeddata["wallet"] = currentWalletValue.toString();

      localStorage.setItem("userInfo", JSON.stringify(storeddata));
      setUserInfo(storeddata);

      const walletdata = {
        username: userInfo.userInfo.username,
        amount: -parseFloat(billdata.amount),
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
          setpopuptext("Bill Payed");
          setShowPopup(true);

          // Close the popup after 1000 milliseconds (1 second)
          setTimeout(() => {
            setShowPopup(false);
          }, 1500);
        }
      } catch (error) {
        console.error("Error adding amount:", error);
      }
      navigate(`/Feedback/${drivername}`);
    }
  };

  const handleconfirmdirect = () => {
    navigate(`/Feedback/${drivername}`);
  };

  return (
    <div className="bill-main">
      {showPopup && (
        <div className="popup">
          <p>{popuptext}</p>
        </div>
      )}
      <div className="bill-box">
        <div className="bill-head">
          <div className="logo-frame"></div>
          <div className="head-frame">
            <div className="heading-textt">Bill Details</div>
          </div>

          <div className="order-detail-head"></div>
        </div>

        <div className="bill-detail">
          <div className="bill-input">Driver: {billdata.driver}</div>
          <div className="bill-input">Car No.: {billdata.carno} </div>
          <div className="bill-input">No. of Passenger: {billdata.seat}</div>
          <div className="bill-input">From: {billdata.from}</div>
          <div className="bill-input">To: {billdata.to}</div>
          <div className="bill-input">Date: {formattedDate}</div>
          <div className="bill-input">Distance: {distanceTravelled} km</div>
          <div className="bill-input">Amount: ${billdata.amount} </div>
          <div className="bill-btn">
            <button
              className="driverbill-btn"
              onClick={() => {
                handleconfirm();
              }}
            >
              Pay by Token
            </button>
            <button
              className="driverbill-btn"
              onClick={() => {
                handleconfirmdirect();
              }}
            >
              Pay directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passengerbill;
