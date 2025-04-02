import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', token);
        
        // Decode the token to get the user ID
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          localStorage.setItem('userId', payload.id);
        } catch (err) {
          console.error('Error decoding token:', err);
        }
        
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);

      if (response.status === 201) {
        // Automatically log in after successful registration
        const loginResponse = await axios.post('http://localhost:8080/auth/login', {
          email: formData.email,
          password: formData.password
        }, {
          withCredentials: true
        });

        if (loginResponse.status === 200) {
          const token = loginResponse.data.token;
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', token);
          
          // Decode the token to get the user ID
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            localStorage.setItem('userId', payload.id);
          } catch (err) {
            console.error('Error decoding token:', err);
          }
          
          return true;
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return {
    login,
    register,
    logout,
    error,
    isLoading
  };
}; 