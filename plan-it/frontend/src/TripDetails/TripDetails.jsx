import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from "./pages/components/TripDetailsHeader";
const TripDetails = () => {
  const { userId } = useParams();
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