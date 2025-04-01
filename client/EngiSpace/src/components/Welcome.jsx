import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl text-[#89b4fa] font-bold mb-6">Welcome to EngiSpace</h1>
          <p className="text-xl text-[#cdd6f4] mb-8">
            Your gateway to engineering excellence. Join our community to share knowledge, ask questions, and connect with fellow engineers.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-[#89b4fa] text-[#1e1e2e] px-8 py-3 rounded-md hover:bg-[#b4befe] transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#313244] text-[#cdd6f4] px-8 py-3 rounded-md hover:bg-[#45475a] transition-colors duration-300 font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 