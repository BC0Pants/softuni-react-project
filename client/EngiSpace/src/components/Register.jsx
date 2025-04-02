import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.username.length < 5) {
      return 'Username must be at least 5 characters long';
    }
    if (formData.password.length < 4) {
      return 'Password must be at least 4 characters long';
    }
    if (formData.password !== formData.rePassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e] pt-16">
      <div className="bg-[#181825] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#89b4fa] mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-[#a6adc8] mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#a6adc8] mb-2">Email</label>
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
          <div>
            <label htmlFor="password" className="block text-[#a6adc8] mb-2">Password</label>
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
          <div>
            <label htmlFor="rePassword" className="block text-[#a6adc8] mb-2">Confirm Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#89b4fa] text-[#1e1e2e] py-2 rounded hover:bg-[#74c7ec] transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-[#a6adc8]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#89b4fa] hover:text-[#74c7ec]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 