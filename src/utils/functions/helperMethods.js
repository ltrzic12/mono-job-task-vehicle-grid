import vehicleStore from "../../stores/VehicleStore";

export const fetchMoreModels = (id, sort) => {
  vehicleStore.fetchMore();
  vehicleStore.fetchVehicleModels(id, sort);
};

export const fetchMoreMakes = (sort) => {
  vehicleStore.fetchMore();
  vehicleStore.fetchVehicleMakes(sort);
};
