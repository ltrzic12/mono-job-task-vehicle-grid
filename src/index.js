import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import vehicleStore from "./stores/VehicleMakeStore";
import vehicleModelStore from "./stores/VehicleModelStore";
import form from "./stores/FormStore";

import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
const stores = {
  vehicleStore,
  vehicleModelStore,
  form,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
);
