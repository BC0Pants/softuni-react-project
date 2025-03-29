import React from 'react';

const Welcome = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
      <div className="text-center p-8 bg-[#181825] rounded-lg shadow-lg">
        <div className="mb-8">
          {/* Logo will be added here once we have the image */}
          <h1 className="text-5xl text-[#89b4fa] font-bold m-0">EngiSpace</h1>
        </div>
        <div>
          <h2 className="text-[#cdd6f4] mb-4">Welcome to EngiSpace</h2>
          <p className="text-[#a6adc8] text-xl m-0">Your gateway to engineering excellence</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 