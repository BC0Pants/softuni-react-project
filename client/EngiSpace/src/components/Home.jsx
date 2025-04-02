import React, { useEffect } from 'react';
import { useFlags } from '../hooks/useFlags';
import CategoryCard from './CategoryCard';

const Home = () => {
  const { flags, error, isLoading, getAllFlags } = useFlags();

  useEffect(() => {
    getAllFlags();
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
        <h1 className="text-4xl text-[#89b4fa] font-bold mb-8">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flags.map((flag) => (
            <CategoryCard key={flag._id} flag={flag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 