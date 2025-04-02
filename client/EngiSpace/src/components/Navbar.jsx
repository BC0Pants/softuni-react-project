import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#181825] fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-[#89b4fa] text-xl font-bold">
            EngiSpace
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-[#a6adc8] hover:text-[#89b4fa] transition-colors duration-300">
              About
            </Link>
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-[#a6adc8] hover:text-[#89b4fa] transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#a6adc8] hover:text-[#89b4fa] transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-[#a6adc8] hover:text-[#89b4fa] transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 