import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from "./pages/components/TripDetailsHeader";
import Accommodation from "./pages/Accommodation";
import Activities from "./pages/Activities";
import DestinationTransportation from "./pages/DestinationTransportation";
import Restaurants from "./pages/Restaurants";
// import BudgetSheet from "./BudgetSheet";
import Bar from "./Bar";
import './TripDetails.css';
import BudgetSheet from "./BudgetSheet";
import MapComponent from "./pages/Maps";
const TripDetails = () => {
  const { userId } = useParams();
  console.log(userId);
  console.log("hello");
  return (

    <div>

      {/* <Bar/> */}
      <NavBar />


      {/* <BudgetSheet/>
        <MapComponent/> */}
      <TripDetailsHeader userId={userId} />
      <Routes>

      </Routes>
      {/* <Accommodation/>
      <DestinationTransportation/>
      <Activities/>
      <Restaurants/> */}
    </div>
  );
};

export default TripDetails;