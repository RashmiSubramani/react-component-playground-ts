import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">
        Home
      </NavLink>
      <NavLink to="/about" className="nav-item">
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
