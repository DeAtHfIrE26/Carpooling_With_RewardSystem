import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./Passengerlist.css";

const Passengerlist = () => {
  const { userInfo } = useUser();
  const [names, setNames] = useState([]);
  const [driverUsername, setdriverUsername] = useState("");
  // console.log(userInfo.username);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://software-gratler.onrender.com/passengerRequest/${userInfo.username}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the component is still mounted before updating state
        if (isMounted) {
          setNames(data.innerMap);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        // If there is an error, stop the interval by clearing the timeout
        clearInterval(intervalId);
      }
    };

    // Initial fetch
    fetchData();

    // Set interval only if there is no error
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      isMounted = false; // Update the flag when the component is unmounted
    };
  }, [driverUsername]);

  const handleconfirm = async (index, name) => {
    try {
      const requestData = {
        passenger: name.data.username,
        driver: userInfo.username,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      };

      const res = await fetch(
        `https://software-gratler.onrender.com/requestDelete`,
        requestOptions
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const objectString = encodeURIComponent(JSON.stringify(name.data));
      navigate(`/Driverbill/${objectString}`);
    } catch (error) {
      console.log("not clicked");
    }
  };
  // Use some static data for testing

  return (
    <div className="Passengerlist-main">
      <div className="Passengerlist-box">
        <label className="Passengertext">Passenger List</label>

        <div className="Passengerlist-detail">
          {names.length > 0 ? (
            names.map((name, index) => (
              <div className="Passengerlist-list" key={index}>
                <div className="Passengerlist-order">
                  <div className="Passengerlist-textstyle">
                    Passenger Username: {name.data.username} &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;Gender: {name.data.gender} &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;Seats: {name.data.seat}
                  </div>
                  <button
                    className="Passengerlist-confirm-btn"
                    onClick={() => handleconfirm(index, name)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="Passengerlist-box-nodata">No Request available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Passengerlist;
