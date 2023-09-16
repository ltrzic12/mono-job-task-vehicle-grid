import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MakesPage from "./pages/MakesPage/MakesPage";
import ModelsPage from "./pages/ModelsPage/ModelsPage";
import "./app.css";
import Form from "./components/Form/Form";
import FormPage from "./pages/Form/FormPage";

function App() {
  return (
    <div className='app'>
      <div className='vehicle-app'>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<MakesPage />}></Route>
          <Route path='/models' element={<ModelsPage />}></Route>
          <Route path='/form' element={<FormPage />}></Route>
          <Route path='/form/edit' element={<FormPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
