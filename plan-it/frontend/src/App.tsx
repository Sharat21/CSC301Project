import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TripDetails from "./TripDetails/TripDetails";
import Restaurants from "./TripDetails/pages/Restaurants"

//import Trips from "./Trips/Trips";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
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
          </Routes>
      </Router>
  );
};

export default App;