import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import TripDetails from "./TripDetails/TripDetails";
import DestinationTransportation from './TripDetails/pages/DestinationTransportation';
import Accommodation from './TripDetails/pages/Accommodation';
import Activities from './TripDetails/pages/Activities';
import Settings from './components/Settings';
import Restaurants from "./TripDetails/pages/Restaurants"
import Trips from "./Trips/Trips";
import Groups from "./Groups/Groups";
import Ideas from './Ideas/Ideas';
import BudgetSheet from './TripDetails/BudgetSheet';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="settings/:userId" element={<Settings />} />
                <Route path="/groups/:userId" element={<Groups />} />
                <Route path="/trips/:groupId/:userId" element={<Trips />} />
                <Route path="/ideas/:ideaId/:userId" element={<Ideas />} />
                <Route path="/trip-details/:userId" element={<DestinationTransportation />} />
                <Route path="/trip-details/destinationtransportation/:userId" element={<DestinationTransportation />} />
                <Route path="/trip-details/accommodation" element={<Accommodation />} />
                <Route path="/trip-details/activities" element={<Activities />} />
                <Route path="/trip-details/restaurants" element={<Restaurants />} />
                <Route path="/trip-details/budgetsheet" element={<BudgetSheet />} />
            </Routes>
        </Router>
    );
};

export default App;
