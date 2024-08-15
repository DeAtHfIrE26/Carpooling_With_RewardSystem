import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRide } from "./Ridecontext";
import "./Bookride.css";
import { useUser } from "./UserContext";

const Bookride = () => {
  const userInfo = useUser();
  const [ispassengercount, setpassengercount] = useState("");
  const [isfrom, setfrom] = useState("");
  const [isto, setto] = useState("");
  const { setRideInfo } = useRide();
  const [newridelist, setnewridelist] = useState([]);
  const [isdata, setdata] = useState("No Data");
  const [buttonTexts, setButtonTexts] = useState([]);

  const [errors, setErrors] = useState({
    seat: "",
    from: "",
    to: "",
  });
  useEffect(() => {
    setButtonTexts(Array(isdata.length).fill("Request"));
  }, [isdata]);

  const navigate = useNavigate();

  const handleride = async () => {
    setdata("No Rides Available");
    const newErrors = {
      seat: ispassengercount ? "" : "Please select no of passengers.",
      from: isfrom ? "" : "Please enter the starting location.",
      to: isto ? "" : "Please enter the destination location.",
    };

    setErrors(newErrors);

    if (isfrom.length > 25 || isfrom.length < 2) {
      setErrors({ from: "should be between 2 to 25" });
    }

    if (isto.length > 25 || isto.length < 2) {
      setErrors({ to: "should be between 2 to 25" });
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const rideresponse = await fetch(
        `https://software-gratler.onrender.com/passengerride/${ispassengercount}/${isfrom}/${isto}`
      );

      if (!rideresponse.ok) {
        throw new Error(`HTTP error! Status: ${rideresponse.status}`);
      }

      const ridearray = await rideresponse.json();
      setRideInfo(ridearray);
      setnewridelist(ridearray);
      console.log(newridelist);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      console.log("finally");
    }
  };

  const handlerequest = async ({ index, rides }) => {
    if (buttonTexts[index] === "Request") {
      setButtonTexts((prevButtonTexts) => {
        const newButtonTexts = [...prevButtonTexts];
        newButtonTexts[index] = "Cancel";
        return newButtonTexts;
      });

      const userRequestData = { ...userInfo.userInfo };
      userRequestData["seat"] = ispassengercount;
      userRequestData["charge"] = rides.charge;
      userRequestData["from"] = rides.from;
      userRequestData["to"] = rides.to;
      userRequestData["driverUsername"] = rides.driver_username;
      userRequestData["carno"] = rides.carno;

      const passengerRequest = {
        driverUsername: rides.driver_username,
        passengerData: userRequestData,
        flag: true,
      };

      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passengerRequest),
        };

        const res = await fetch(
          `https://software-gratler.onrender.com/passengerlist`,
          requestOptions
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        console.log("Added");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("already Requested");
      const deleteRequest = {
        driverUsername: rides.driver_username,
        passengerUsername: userInfo.userInfo.username,
      };

      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deleteRequest),
        };
        const res = await fetch(
          `https://software-gratler.onrender.com/singleRequest`,
          requestOptions
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        console.log("Request Deleted");
      } catch (error) {
        console.log("error in deleting request");
      }
      setButtonTexts((prevButtonTexts) => {
        const newButtonTexts = [...prevButtonTexts];
        newButtonTexts[index] = "Request";
        return newButtonTexts;
      });
    }
  };

  useEffect(() => {
    const fetchFlag = async () => {
      const userName = userInfo.userInfo.username;

      try {
        const res = await fetch(
          `https://software-gratler.onrender.com/confirmbook/${userName}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const userData = await res.json(); // Await the JSON parsing
        const billdata = {
          driver: userData.driver,
          from: isfrom,
          to: isto,
          seat: ispassengercount,
          amount: 10 * 10,
          carno: userData.carno,
        };
        const driverdata = encodeURIComponent(JSON.stringify(billdata));
        if (userData.flg === "false") {
          console.log("false");
          navigate(`/Passengerbill/${driverdata}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFlag();

    const intervalId = setInterval(() => {
      fetchFlag();
    }, 5000);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      // Update the flag when the component is unmounted
    };
  }, [newridelist]);

  return (
    <>
      <div className="bookride">
        <div className="bookride-input">
          <div className="bookride-input-text">
            <div className="bookride-text">From</div>
            <div className="bookride-text" style={{ paddingLeft: "10px" }}>
              To
            </div>
            <div className="bookride-text" style={{ paddingLeft: "15px" }}>
              Passenger
            </div>
          </div>
          <div className="bookride-input-field">
            <div>
              <input
                type="text"
                className="bookride-field"
                value={isfrom}
                onChange={(e) => {
                  setfrom(e.target.value);
                }}
                required
              />
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  bottom: "525px",
                  left: "180px",
                }}
                className="bookride-error"
              >
                {errors.from}
              </div>
            </div>
            <div>
              <input
                type="text"
                className="bookride-field"
                value={isto}
                onChange={(e) => {
                  setto(e.target.value);
                }}
                required
              />
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  bottom: "525px",
                  left: "580px",
                }}
                className="bookride-error"
              >
                {errors.to}
              </div>
            </div>
            <div>
              <select
                value={ispassengercount}
                className="bookride-field"
                style={{ borderWidth: "2px" }}
                onChange={(e) => {
                  setpassengercount(e.target.value);
                }}
                required
              >
                <option value="">Select seat</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  bottom: "525px",
                  left: "980px",
                }}
                className="bookride-error"
              >
                {errors.seat}
              </div>
            </div>
          </div>
        </div>

        <button
          className="bookride-button"
          onClick={() => {
            handleride();
          }}
        >
          Submit
        </button>

        <div className="bookride-ridelist">
          {newridelist.length === 0 ? (
            <div className="nodata"> {isdata}</div>
          ) : (
            <div className="ridelist-detail">
              {newridelist.map((rides, index) => (
                <div className="list">
                  <div key={index} className="order">
                    <div className="textstyle">
                      Driver Username: {rides.driver_username} &nbsp; &nbsp;
                      &nbsp; &nbsp;Gender:Male &nbsp; &nbsp; &nbsp; &nbsp;Car
                      No.: {rides.carno} &nbsp; &nbsp; &nbsp; &nbsp; Charge(per
                      km): {rides.charge}
                    </div>
                    <button
                      className="confirm-btn"
                      style={{
                        backgroundColor:
                          buttonTexts[index] === "Request" ? "" : "#75e222",
                      }}
                      onClick={() => {
                        handlerequest({ index, rides });
                      }}
                    >
                      {" "}
                      {buttonTexts[index]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookride;