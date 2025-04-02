import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ flag }) => {
  return (
    <Link
      to={`/category/${flag._id}`}
      className="bg-[#181825] p-6 rounded-lg hover:bg-[#313244] transition-colors duration-300"
    >
      <h2 className="text-2xl text-[#89b4fa] font-semibold mb-2">{flag.name}</h2>
      <p className="text-[#a6adc8]">{flag.description}</p>
    </Link>
  );
};

export default CategoryCard; 