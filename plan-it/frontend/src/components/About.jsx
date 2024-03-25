// aboutPage.jsx
import React from 'react';
import Navbar from './NavBar';
import './aboutPage.css'; // Import CSS file for styling

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1 className="about-heading">About PlanIt</h1>
        <div className="about-content">
        <p className='objective-content'>
            PlanIt is a sophisticated trip planning application that revolutionizes the way groups organize and manage their travel adventures. With PlanIt, users can seamlessly create, coordinate, and finalize their trips, ensuring a hassle-free and enjoyable experience for all participants.
          </p>
          <p className='objective-content'>
            One of the standout features of PlanIt is its integration of interactive maps, allowing users to visualize their trip routes, explore destinations, and plan activities with pinpoint accuracy. Additionally, PlanIt offers a unique voting system that facilitates group decision-making, helping friends and colleagues come to a consensus on trip plans and effectively solving the problem of trip confirmation.
          </p>
          <p className='objective-content'>
            Whether it's a weekend getaway with friends or a business retreat with colleagues, PlanIt empowers users to create memorable experiences and forge deeper connections through shared adventures.
          </p>
        </div>
        <div className="feature-section">
          <h2 className="section-heading">Key Features:</h2>
          <ul className="feature-list">
            <li>Create/Edit Trip</li>
            <li>Interactive Maps for Route Planning</li>
            <li>Unique Voting System for Decision Making</li>
            <li>Enter Transportation and Food Details</li>
            <li> Join Groups made by Friends to Plan trips </li>
            <li>Calculate Estimated Cost</li>
            <li>Feedback System</li>
            <li>Edit Privileges</li>
            <li>User Accounts and Group Creation</li>
            <li> Email users final plan details </li>
          </ul>
        </div>
        <div className="objective-section">
          <h2 className="section-heading">Project Objectives</h2>
          <p className='objective-content'>
            PlanIt aims to provide a user-friendly interface for efficient trip planning, incorporating features such as login, registration, group creation, trip sharing, feedback gathering, and budget tracking.
          </p>
        </div>
        <div className="user-section">
          <h2 className="section-heading">Key Users:</h2>
          <p className='objective-content'>
            PlanIt targets frequent travelers, group organizers, and budget-conscious users who require efficient planning tools to enhance their travel experiences, streamline trip planning processes, and manage expenses effectively.
          </p>
        </div>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}

export default AboutPage;