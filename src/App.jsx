import { Route, Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import VehicleMakeList from "./components/VehicleMakeList/VehicleMakeList";
import VehicleModelList from "./components/VehicleModelList/VehicleModelList";
import vehicleMakeService from "./services/VehicleMakeService";
import AddModelForm from "./components/Forms/AddModelForm";
import MakesPage from "./pages/MakesPage/MakesPage";
import ModelsPage from "./pages/ModelsPage/ModelsPage";
import NewModelFormPage from "./pages/NewModelFormPage/NewModelFormPage";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/makes' element={<MakesPage />}></Route>
        <Route path='/models' element={<ModelsPage />}></Route>
        <Route path='/addmodel' element={<NewModelFormPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
