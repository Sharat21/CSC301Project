import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import TripDetails from "./TripDetails/TripDetails";
import DestinationTransportation from './TripDetails/pages/DestinationTransportation';
import Accommodation from './TripDetails/pages/Accommodation';
import Activities from './TripDetails/pages/Activities';

import Restaurants from "./TripDetails/pages/Restaurants"
import Trips from "./Trips/Trips";
import Groups from "./Groups/Groups";
import Ideas from './Ideas/Ideas';
import BudgetSheet from './TripDetails/BudgetSheet';

//function App() {
  // return <p>Hello World</p>;
  //return <div ><Trips /></div>
  //return <div> <Ideas /> </div>
// import LoginPage from "./components/LoginPage";
// import Bar from "./TripDetails/Bar";
// import BudgetSheet from "./TripDetails/BudgetSheet";
// import BudgetSheet from "./TripDetails/pages/BudgetSheet";
const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/groups/:userId" element={<Groups />} />
              <Route path="/trips/:groupId" element={<Trips />} />
              <Route path="/ideas/:ideaId" element={<Ideas />} /> 
              <Route path="/trip-details/*" element={<TripDetails />} />
              <Route path="/trip-details/destinationtransportation" element={<DestinationTransportation />} />
              <Route path="/trip-details/accommodation" element={<Accommodation />} />
              <Route path="/trip-details/activities" element={<Activities />} />
              <Route path="/trip-details/restaurants" element={<Restaurants />} />
              <Route path="/trip-details/budgetsheet" element={<BudgetSheet />} />
          </Routes>
      </Router>
  );
};

export default App;
