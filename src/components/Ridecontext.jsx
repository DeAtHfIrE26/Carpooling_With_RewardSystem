import React, { createContext, useContext, useState, useEffect } from 'react';

const Ridecontext = createContext();

export const Rideprovider = ({ children }) => {
 

  const [RideInfo, setRideInfo] = useState([]);


  return (
    <Ridecontext.Provider value={{ RideInfo, setRideInfo }}>
      {children}
    </Ridecontext.Provider>
  );
};


export const useRide = () => {
  const context = useContext(Ridecontext);
  if (!context) {
    throw new Error('Ridecontext must be used within a UserProvider');
  }

  return context;
};
