import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUsername = JSON.parse(localStorage.getItem("userInfo"))?.username;

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem(`userInfo`))
  );

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem(`userInfo`, JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
