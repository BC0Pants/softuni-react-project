import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      // Navigate to the intended destination if it exists, otherwise go to home
      const from = location.state?.from || '/';
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
      <div className="bg-[#181825] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-[#89b4fa] font-bold mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#a6adc8] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#a6adc8] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-[#89b4fa] text-[#1e1e2e] rounded hover:bg-[#74c7ec] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-[#a6adc8]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#89b4fa] hover:text-[#74c7ec]">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;