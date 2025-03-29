import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 bg-[#181825] shadow-md z-50">
      <div className="flex items-center">
        <Link to="/" className="text-[#89b4fa] text-2xl font-bold hover:text-[#b4befe] transition-colors duration-300">
          EngiSpace
        </Link>
      </div>
      <div className="flex gap-8 items-center">
        <Link to="/about" className="text-[#cdd6f4] hover:text-[#89b4fa] transition-colors duration-300">
          About
        </Link>
        <Link to="/login" className="text-[#cdd6f4] hover:text-[#89b4fa] transition-colors duration-300">
          Login
        </Link>
        <Link to="/register" className="text-[#cdd6f4] hover:text-[#89b4fa] transition-colors duration-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 