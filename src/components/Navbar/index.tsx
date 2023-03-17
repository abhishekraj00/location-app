import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/" data-testid="navigation-locations-tab">
        Home
      </Link>
      <Link className="nav-link" to="/map" data-testid="navigation-map-tab">
        Map
      </Link>
    </nav>
  );
};

export default Navbar;
