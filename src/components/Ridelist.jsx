import React, { useEffect, useState } from "react";
import { useRide } from "./Ridecontext";

const Ridelist = () =>{
    const {RideInfo} = useRide();
    const [names,setnames] = useState([]);

useEffect(()=>{
    setnames(RideInfo);
},[])
      

  return (
    <div>
    <h1>List of Rides</h1>
    <ul>
      {names.map((name, index) => (
        <li key={index}>
          {name.driver_username},{name.code},{name.from}
          <button>Get Details</button>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default Ridelist;