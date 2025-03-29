import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="logo-container">
          {/* Logo will be added here once we have the image */}
          <h1 className="logo-text">EngiSpace</h1>
        </div>
        <div className="welcome-text">
          <h2>Welcome to EngiSpace</h2>
          <p>Your gateway to engineering excellence</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 