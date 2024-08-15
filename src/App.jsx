import React from "react";
import "./App.css";

import RegistrationForm from "./components/RegistrationForm";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Demo from "./components/Demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Provideride from "./components/Provideride";
import Profile from "./components/Profile";
import { UserProvider } from "./components/UserContext";
import Passengerlist from "./components/Passengerlist";
import Bookride from "./components/Bookride";
import { Rideprovider } from "./components/Ridecontext";
import Ridelist from "./components/Ridelist";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Driverbill from "./components/Driverbill";
import Passengerbill from "./components/Passengerbill";
import Feedback from "./components/Feedback";

function App() {
  // useEffect(() => {
  // 	fetch("https://software-gratler.onrender.com/ride").then((response) => {response.json().then((res)=>{
  //   console.log(res);
  //   setData(res)
  // })})
  // }, []);

  return (
    <div>
      <div>
        <BrowserRouter>
          <UserProvider>
            <Rideprovider>
              <div className="nav">
                <Navbar></Navbar>
              </div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/RegistrationForm"
                  element={<RegistrationForm />}
                />
                <Route path="/Layout" element={<Layout />}></Route>
                <Route path="/Provideride" element={<Provideride />}></Route>
                <Route path="/Demo" element={<Demo />}></Route>
                <Route path="/Profile" element={<Profile />}></Route>
                <Route
                  path="/Passengerlist"
                  element={<Passengerlist />}
                ></Route>
                <Route path="/Bookride" element={<Bookride />}></Route>
                <Route path="/Ridelist" element={<Ridelist />}></Route>
                <Route path="/Pricing" element={<Pricing />}></Route>
                <Route path="/About" element={<About />}></Route>
                <Route
                  path="/Driverbill/:objectString"
                  element={<Driverbill></Driverbill>}
                ></Route>
                <Route
                  path="/Passengerbill/:driverdata"
                  element={<Passengerbill></Passengerbill>}
                ></Route>
                <Route
                  path="/Feedback/:drivername"
                  element={<Feedback></Feedback>}
                ></Route>
              </Routes>
            </Rideprovider>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
