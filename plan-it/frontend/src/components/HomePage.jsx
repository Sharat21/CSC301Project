// homepage.jsx
import React from 'react';
import Navbar from './NavBar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to PlanIt!</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default HomePage;
