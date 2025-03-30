import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (formData.username.length < 5) {
      setError('Username must be at least 5 characters long');
      return false;
    }
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return false;
    }
    if (formData.password !== formData.rePassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rePassword: formData.rePassword
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
      <div className="w-full max-w-md p-8 bg-[#181825] rounded-lg shadow-lg">
        <h2 className="text-3xl text-[#89b4fa] font-bold text-center mb-8">Register</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
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
          <div>
            <label htmlFor="rePassword" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-[#89b4fa] text-[#1e1e2e] font-medium rounded-md hover:bg-[#b4befe] transition-colors duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-[#a6adc8]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#89b4fa] hover:text-[#b4befe] transition-colors duration-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 