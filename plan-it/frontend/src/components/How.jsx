// aboutPage.jsx
import React from 'react';
import Navbar from './NavBar';

function HowPage() {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>How PlanIt Works</h1>
          <p>This is the How Page of PlanIt.</p>
          {/* Add more content here */}
        </div>
      </div>
    );
  }
  
  export default HowPage;
