import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import vehicleStore from "./stores/VehicleStore";
import vehicleModelStore from "./stores/VehicleModelStore";
import { Provider } from "mobx-react";
const stores = {
  vehicleStore,
  vehicleModelStore,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider {...stores}>
    <App></App>
  </Provider>,
);
