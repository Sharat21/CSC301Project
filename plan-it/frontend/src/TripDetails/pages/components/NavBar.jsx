import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <nav className="sidebar">
        <ul>
          <li><Link to="/trip-details/destinationtransportation"><span>Destination & Transportation</span></Link></li>
          <li><Link to="/trip-details/accommodation"><span>Accommodation</span></Link></li>
          <li><Link to="/trip-details/activities"><span>Activities</span></Link></li>
          <li><Link to="/trip-details/restaurants"><span>Restaurants</span></Link></li>
          <li><Link to="/trip-details/budgetsheet"><span>Budget Sheet</span></Link></li>
          <li className="bottom-link"><Link to="/trip-board"><span>Go Back to Trip Board</span></Link></li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;