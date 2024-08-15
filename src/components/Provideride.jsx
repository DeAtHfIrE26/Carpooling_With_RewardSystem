import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Provideride.css";
import { useUser } from "./UserContext";

const Provideride = () => {
  const [islicence, setlicence] = useState("");
  const [isseat, setseat] = useState("");
  const [iscarno, setcarno] = useState("");
  const [iscarname, setcarname] = useState("");
  const [iscartype, setcartype] = useState("");
  const [ischarge, setcharge] = useState("");
  const [isfrom, setfrom] = useState("");
  const [isto, setto] = useState("");

  const { userInfo } = useUser();

  const [errors, setErrors] = useState({
    licence: "",
    seat: "",
    carno: "",
    carname: "",
    cartype: "",
    charge: "",
    from: "",
    to: "",
  });

  const navigate = useNavigate();

  const handleride = () => {
    const newErrors = {
      licence: islicence ? "" : "Please enter your driving licence.",
      seat: isseat ? "" : "Please select the available seat.",
      carno: iscarno ? "" : "Please enter the car number.",
      carname: iscarname ? "" : "Please enter the car name.",
      cartype: iscartype ? "" : "Please select the car type.",
      charge: ischarge ? "" : "Please enter the charge per km.",
      from: isfrom ? "" : "Please enter the starting location.",
      to: isto ? "" : "Please enter the destination location.",
    };

    setErrors(newErrors);

    if (islicence.length !== 16) {
      setErrors({ license: "not valid licence detail" });
    }

    if (iscarno.length < 7 || iscarno.length > 10) {
      setErrors({ carno: "not valid car detail" });
    }

    if (iscarname.length < 2 || iscarname.length > 25) {
      setErrors({ carname: "not valid car detail" });
    }

    if (ischarge > 1000) {
      setErrors({ charge: "Provide charge less than 1000" });
    }

    if (isfrom.length < 2 || isfrom.length > 25) {
      setErrors({ from: "Pickup location character should be 2 to 20" });
    }

    if (isto.length < 2 || isto.length > 25) {
      setErrors({ to: "Drop location character should be 2 to 20" });
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    const ridedetail = {
      licence: islicence,
      seat: isseat,
      carno: iscarno,
      carname: iscarname,
      cartype: iscartype,
      charge: ischarge,
      from: isfrom,
      to: isto,
      driver_username: userInfo.username,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ridedetail),
    };

    fetch("https://software-gratler.onrender.com/ridedetails", requestOptions)
      .then((res) => {
        console.log("resse", res);

        navigate("/Passengerlist");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div className="main">
        <div className="registration-box">
          <div className="registration-text">Provide a ride</div>
          <div className="registration-input">
            <div className="input-1">
              <div>
                <input
                  placeholder="Driving license"
                  className="firstname"
                  type="text"
                  value={islicence}
                  onChange={(e) => {
                    setlicence(e.target.value);
                  }}
                  required
                />
                {errors.licence && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "390px",
                      left: "280px",
                    }}
                    className="error"
                  >
                    {errors.licence}
                  </div>
                )}
              </div>
              <div>
                <select
                  className="firstname"
                  value={isseat}
                  onChange={(e) => {
                    setseat(e.target.value);
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
                {errors.seat && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "390px",
                      left: "745px",
                    }}
                    className="error"
                  >
                    {errors.seat}
                  </div>
                )}
              </div>
            </div>
            <div className="input-1">
              <div>
                <input
                  placeholder="Car number"
                  className="firstname"
                  type="text"
                  value={iscarno}
                  onChange={(e) => {
                    setcarno(e.target.value);
                  }}
                  required
                />
                {errors.carno && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "297px",
                      left: "280px",
                    }}
                    className="error"
                  >
                    {errors.carno}
                  </div>
                )}
              </div>

              <input
                placeholder="Car name"
                className="firstname"
                type="text"
                value={iscarname}
                onChange={(e) => {
                  setcarname(e.target.value);
                }}
                required
              />
              {errors.carname && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "297px",
                    left: "745px",
                  }}
                  className="error"
                >
                  {errors.carname}
                </div>
              )}
            </div>

            <div className="input-1">
              <div>
                <select
                  className="firstname"
                  value={iscartype}
                  onChange={(e) => {
                    setcartype(e.target.value);
                  }}
                  required
                >
                  <option value="">Select car type</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                </select>
                {errors.cartype && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "205px",
                      left: "280px",
                    }}
                    className="error"
                  >
                    {errors.cartype}
                  </div>
                )}
              </div>
              <div>
                <input
                  placeholder="Charge per km"
                  className="firstname"
                  type="text"
                  value={ischarge}
                  onChange={(e) => {
                    setcharge(e.target.value);
                  }}
                  required
                />
                {errors.charge && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "205px",
                      left: "745px",
                    }}
                    className="error"
                  >
                    {errors.charge}
                  </div>
                )}
              </div>
            </div>

            <div className="input-1">
              <div>
                <input
                  placeholder="From"
                  className="firstname"
                  type="text"
                  value={isfrom}
                  onChange={(e) => {
                    setfrom(e.target.value);
                  }}
                  required
                />
                {errors.from && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "110px",
                      left: "280px",
                    }}
                    className="error"
                  >
                    {errors.from}
                  </div>
                )}
              </div>
              <div>
                <input
                  className="firstname"
                  placeholder="To"
                  type="text"
                  value={isto}
                  onChange={(e) => {
                    setto(e.target.value);
                  }}
                  required
                />
                {errors.to && (
                  <div
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: "110px",
                      left: "745px",
                    }}
                    className="error"
                  >
                    {errors.to}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="registraion-final">
            <button onClick={handleride} className="registration-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provideride;