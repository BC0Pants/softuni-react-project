import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
      <div className="w-full max-w-md p-8 bg-[#181825] rounded-lg shadow-lg">
        <h2 className="text-3xl text-[#89b4fa] font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#89b4fa] text-[#1e1e2e] font-medium rounded-md hover:bg-[#b4befe] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-[#a6adc8]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#89b4fa] hover:text-[#b4befe] transition-colors duration-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;