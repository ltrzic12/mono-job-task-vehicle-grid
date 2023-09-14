import { Route, Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import VehicleMakeList from "./components/VehicleMakeList/VehicleMakeList";
import VehicleModelList from "./components/VehicleModelList/VehicleModelList";
import vehicleMakeService from "./services/VehicleMakeService";

function App() {
  return (
    <div className='vehicle-app'>
      <VehicleMakeList></VehicleMakeList>

      <VehicleModelList></VehicleModelList>
      <button onClick={() => vehicleMakeService.addVehicleMake()}>
        Add make
      </button>
    </div>
  );
}

export default App;
