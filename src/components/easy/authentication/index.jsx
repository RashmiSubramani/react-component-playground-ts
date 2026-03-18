import React from "react";
import { UserProvider } from "./userContext";
import Navbar from "./NavBar";
import Dashboard from "./Dashboard";

const AuthenticationWrapper = () => {
  return (
    <UserProvider>
      <div className="app">
        <Navbar />
        <Dashboard />
      </div>
    </UserProvider>
  );
};

export default AuthenticationWrapper;
