import { useState } from 'react';
import axios from 'axios';

export const useFlags = () => {
  const [flags, setFlags] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAllFlags = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:8080/flags/all');
      setFlags(response.data);
    } catch (err) {
      setError('Failed to load categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    flags,
    error,
    isLoading,
    getAllFlags
  };
}; 