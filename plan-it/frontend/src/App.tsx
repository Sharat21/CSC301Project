import React from "react";
import LoginPage from "./components/LoginPage";
import Bar  from "./TripDetails/Bar";
import TripDetails from "./TripDetails/TripDetails";
import Restaurants from "./TripDetails/pages/Restaurants"

function App() {
  return (
    <>
      <LoginPage />
    </>
  );
  // return <p>Hello World</p>;
  return (
    <div>
      <Bar/>
      <TripDetails/>
      <Restaurants/>
    </div>
  );

}

export default App;
