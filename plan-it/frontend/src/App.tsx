import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AboutPage from './components/About';
import HowPage from './components/How';
import DestinationTransportation from './TripDetails/pages/DestinationTransportation';
import Accommodation from './TripDetails/pages/Accommodation';
import Activities from './TripDetails/pages/Activities';
import Settings from './components/Settings';
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
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how" element={<HowPage />} />
              <Route path="*" element={<HomePage />} />              
              <Route path="/register" element={<RegisterPage />} />
              <Route path="settings/:userId" element={<Settings />} />
              <Route path="/groups/:userId" element={<Groups />} />
              <Route path="/trips/:groupId/:userId" element={<Trips />} />
              <Route path="/trip-details/:tripId/:userId/:groupId" element={<DestinationTransportation />} />
              <Route path="/ideas/:groupId/:tripId/:userId" element={<Ideas />} /> 
              <Route path="/trip-details/destinationtransportation/:groupId/:tripId/:userId" element={<DestinationTransportation />} />
              <Route path="/trip-details/accommodation/:groupId/:tripId/:userId" element={<Accommodation />} />
              <Route path="/trip-details/activities/:groupId/:tripId/:userId" element={<Activities />} />
              <Route path="/trip-details/restaurants/:groupId/:tripId/:userId" element={<Restaurants />} />
              <Route path="/trip-details/budgetsheet/:groupId/:tripId/:userId" element={<BudgetSheet />} />
              <Route path="/trip-details/map/:groupId/:tripId/:userId" element={<MapComponent />} />
              <Route path="/trip-details/confirmation/:groupId/:tripId/:userId" element={<Confirmation />} />
          </Routes>
      </Router>
  );
};

export default App;
