import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import vehicleStore from "./stores/VehicleStore";
import { Provider } from "mobx-react";
const stores = {
  vehicleStore,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider {...stores}>
    <App></App>
  </Provider>,
);
