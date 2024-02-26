import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TripDetails from "./TripDetails/TripDetails";
import Restaurants from "./TripDetails/pages/Restaurants";
import Ideas from "./Ideas/Ideas";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
  );
};

export default App;