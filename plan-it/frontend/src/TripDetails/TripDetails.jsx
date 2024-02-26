import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom"; 
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from "./pages/components/TripDetailsHeader";
import Accommodation from "./pages/Accommodation";
import Activities from "./pages/Activities";
import DestinationTransportation from "./pages/DestinationTransportation";
import Restaurants from "./pages/Restaurants";
import BudgetSheet from "./BudgetSheet";
import Bar from "./Bar";
import './TripDetails.css';
import BudgetSheet from "./BudgetSheet";
import MapComponent from "./pages/Maps";
const TripDetails = () => {


  return (

    <div>
      
        {/* <Bar/> */}
        <NavBar/>

        
        {/* <BudgetSheet/>
        <MapComponent/> */}
      <TripDetailsHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/trip-details/destinationtransportation" />} />
        <Route path="/trip-details/destinationtransportation" element={<DestinationTransportation />} />
        <Route path="/trip-details/accommodation" element={<Accommodation />} />
        <Route path="/trip-details/activities" element={<Activities />} />
        <Route path="/trip-details/restaurants" element={<Restaurants />} />
        <Route path="/trip-details/budgetsheet" element={<BudgetSheet />} />
      </Routes>
      {/* <Accommodation/>
      <DestinationTransportation/>
      <Activities/>
      <Restaurants/> */}
    </div>
  );
};

export default TripDetails;