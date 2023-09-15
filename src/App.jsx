import { Route, Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import VehicleMakeList from "./components/VehicleMakeList/VehicleMakeList";
import VehicleModelList from "./components/VehicleModelList/VehicleModelList";
import vehicleMakeService from "./services/VehicleMakeService";
import AddModelForm from "./components/Forms/AddModelForm";
import MakesPage from "./pages/MakesPage/MakesPage";
import ModelsPage from "./pages/ModelsPage/ModelsPage";
import NewModelFormPage from "./pages/NewModelFormPage/NewModelFormPage";
import "./app.css";
import NewMakeFormPage from "./pages/NewMakeFormPage/NewMakeFormPage";
function App() {
  return (
    <div className='app'>
      <div className='vehicle-app'>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<MakesPage />}></Route>
          <Route path='/models' element={<ModelsPage />}></Route>
          <Route path='/add-model' element={<NewModelFormPage />}></Route>
          <Route path='/add-make' element={<NewMakeFormPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
