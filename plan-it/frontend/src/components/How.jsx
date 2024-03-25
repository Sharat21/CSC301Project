// aboutPage.jsx
import React from 'react';
import Navbar from './NavBar';

import './aboutPage.css'; // Import CSS file for styling

function HowPage() {
  return (
    <div>
      <Navbar />
      <div className="how-container">
        <h1 className="how-heading">How It Works</h1>
        <div className="step">
          <h2 className="step-heading">Step 1: Login or Create an Account</h2>
          <p className="step-description">
            To get started, simply navigate to the login page and enter your credentials if you already have an account. If you're new to PlanIt, click on the registration link to create an account. Once logged in, you'll gain access to the system.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 2: Access Your Groups</h2>
          <p className="step-description">
            After logging in, you'll see all the groups you're a part of. From here, you can select a group to view the trips associated with it. You can also join another group by entering an invite code.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 3: Propose New Trips</h2>
          <p className="step-description">
            Once in your group, you can propose new trips. All users in the group can participate in the decision-making process for these trips.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 4: Create Ideas for the Trip</h2>
          <p className="step-description">
            Propose different aspects of the trip, such as restaurants, accommodations, activities, and transportation. Provide relevant details for each idea to help with decision-making.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 5: Vote on Ideas</h2>
          <p className="step-description">
            Once ideas are proposed, users can vote on them to confirm them as part of the official trip plan.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 6: View Trip Details</h2>
          <p className="step-description">
            After confirming trip ideas, users can view important trip details, including total budgets and pinned locations for confirmed events.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 7: Finalize the Trip</h2>
          <p className="step-description">
            Once all confirmed trip ideas are added and users are satisfied, proceed with one final vote to confirm the entire trip. Users will receive an email with a trip summary containing all decided trip details.
          </p>
        </div>
        <div className="step">
          <h2 className="step-heading">Step 8: Book Your Trip</h2>
          <p className="step-description">
            With the trip confirmed, it's time to book your tickets and accommodations. Enjoy your vacation stress-free, knowing that all the planning is taken care of!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowPage;
