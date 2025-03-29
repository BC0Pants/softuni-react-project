import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="home-link">
          EngiSpace
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 