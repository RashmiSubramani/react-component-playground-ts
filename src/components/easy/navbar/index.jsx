import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "./Home";
import About from "./About";

const NavBarWrapper = () => {
  return (
    <MemoryRouter>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default NavBarWrapper;
