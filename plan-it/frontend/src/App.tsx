import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import DestinationTransportation from './TripDetails/pages/DestinationTransportation';
import Accommodation from './TripDetails/pages/Accommodation';
import Activities from './TripDetails/pages/Activities';

import Restaurants from "./TripDetails/pages/Restaurants"
import Trips from "./Trips/Trips";
import Groups from "./Groups/Groups";
import Ideas from './Ideas/Ideas';
import BudgetSheet from './TripDetails/BudgetSheet';
import MapComponent from './TripDetails/pages/Maps';
import Confirmation from './TripDetails/pages/Confirmation';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<LoginPage />} />              
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/groups/:userId" element={<Groups />} />
              <Route path="/trips/:groupId" element={<Trips />} />
              <Route path="/ideas/:tripId" element={<Ideas />} /> 
              <Route path="/trip-details/" element={<DestinationTransportation />} />
              <Route path="/trip-details/destinationtransportation/:tripId" element={<DestinationTransportation />} />
              <Route path="/trip-details/accommodation/:tripId" element={<Accommodation />} />
              <Route path="/trip-details/activities/:tripId" element={<Activities />} />
              <Route path="/trip-details/restaurants/:tripId" element={<Restaurants />} />
              <Route path="/trip-details/budgetsheet/:tripId" element={<BudgetSheet />} />
              <Route path="/trip-details/map/:tripId" element={<MapComponent />} />
              <Route path="/trip-details/confirmation/:tripId" element={<Confirmation />} />
          </Routes>
      </Router>
  );
};

export default App;
