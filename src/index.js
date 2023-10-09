import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import vehicleMakeStore from "./stores/VehicleMakeStore";
import vehicleModelStore from "./stores/VehicleModelStore";
import form from "./stores/FormStore";
import { newMakeForm } from "./stores/form/AddNewMakeStore";
import { newModelForm } from "./stores/form/AddNewModelStore";
import { editModelForm } from "./stores/form/EditModelStore";

import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
const stores = {
  vehicleMakeStore,
  vehicleModelStore,
  form,
  newMakeForm,
  newModelForm,
  editModelForm,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
);
