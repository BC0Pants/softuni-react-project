import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flagsResponse = await axios.get('http://localhost:8080/flags/all');
        setFlags(flagsResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
        <div className="text-[#89b4fa] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl text-[#89b4fa] font-bold">Categories</h1>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {flags.map((flag) => (
            <Link
              key={flag._id}
              to={`/category/${flag._id}`}
              className="block bg-[#181825] p-6 rounded-lg hover:bg-[#313244] transition-colors duration-300"
            >
              <h3 className="text-xl text-[#89b4fa] font-semibold mb-2">{flag.name}</h3>
              {flag.description && (
                <p className="text-[#a6adc8]">{flag.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 