import { BrowserRouter as Routes } from "react-router-dom"; 
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from "./pages/components/TripDetailsHeader";
const TripDetails = () => {
  return (
    <div>
      <NavBar/>
      <TripDetailsHeader />
      <Routes>
      </Routes>
    </div>
  );
};

export default TripDetails;