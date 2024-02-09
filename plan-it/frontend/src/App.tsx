import React from "react";
import Bar  from "./TripDetails/Bar";
import TripDetails from "./TripDetails/TripDetails";
import Restaurants from "./TripDetails/pages/Restaurants"
import BudgetSheet from "./TripDetails/pages/BudgetSheet";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // return <p>Hello World</p>;
  return (
    <div>
      <Bar/>
      <TripDetails/>
      <Restaurants/>
      <BudgetSheet/>
    </div>
  );

}

export default App;
