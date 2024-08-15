import { useEffect, useState } from "react";
import "./Layout.css";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { userInfo } = useUser();

  const navigate = useNavigate();
  const navigatetoprovide = () => {
    const age = new Date(userInfo.dob);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - age;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInYears = ageInDays / 365;
    console.log(age);
    console.log(Math.floor(ageInYears));

    if (Math.floor(ageInYears) < 18) {
      setShowPopup(true);

      // Close the popup after 1000 milliseconds (1 second)
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
      return;
    }

    navigate("/Provideride");
  };

  const navigatetobook = () => {
    navigate("/Bookride");
  };

  useEffect(() => {
    console.log("context data:", userInfo);
  }, [userInfo]);
  return (
    <div className="layout">
      {showPopup && (
        <div className="popup">
          <p>{"You Are Below 18 Years"}</p>
        </div>
      )}
      <div className="book-provide">
        <div className="ride">
          <div className="ride-content-1">
            <div className="content">
              <p>
                Share the journey and make a positive impact on the environment!
                Offer your available seats to fellow travelers heading in the
                same direction. Set your own schedule, meet new people, and
                contribute to a greener commute. Join our carpooling community
                and be part of the solution.
              </p>
            </div>
          </div>
          <button onClick={navigatetoprovide} className="ride-button">
            Provide Ride
          </button>
        </div>

        <div className="ride">
          <div className="ride-content-2">
            <div className="content">
              <p>
                Need a convenient and cost-effective way to travel? Book a ride
                with our carpooling service! Browse available rides, choose a
                driver with a similar destination, and enjoy a comfortable
                journey. Reduce your carbon footprint, save money, and connect
                with friendly drivers. Booking a ride has never been easier!
              </p>
            </div>
          </div>
          <button onClick={navigatetobook} className="ride-button">
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
