import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom"; 
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from "./pages/components/TripDetailsHeader";
import Accommodation from "./pages/Accomodation";
import Activities from "./pages/Activities";
import DestinationTransportation from "./pages/DestinationTransportation";
import Restaurants from "./pages/Restaurants";
import './TripDetails.css';

const TripDetails = () => {
  return (
    <div className="bg-black text-white py-12" id="home">
      {/* <TripDetailsHeader /> */}
      <div className="h-screen w-full text-5xl font-bold py-12">
        Trip Details
      </div>
      {/* Add any other content specific to this page */}
    </div>
  );
};

export default TripDetails;