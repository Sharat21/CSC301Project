// aboutPage.jsx
import React from 'react';
import Navbar from './NavBar';

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>About PlanIt</h1>
        <p>This is the About Page of PlanIt.</p>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default AboutPage;
