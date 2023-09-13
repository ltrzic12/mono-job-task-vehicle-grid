import { makeObservable, observable, action } from "mobx";
import vehicleMakeService from "../services/VehicleMakeService";

class VehicleMakeStore {
  vehicleMakes = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      isLoading: observable,
      fetchVehicleMakes: action,
    });
  }

  fetchVehicleMakes = async () => {
    try {
      this.isLoading = true; // Set loading to true while fetching

      // Use the service class to fetch data from Firestore
      const vehicleMakes = await vehicleMakeService.getVehicleMakes();

      // Update the observable state with the fetched data
      this.vehicleMakes = vehicleMakes;
    } catch (error) {
      console.error("Error fetching VehicleMakes:", error);
    } finally {
      this.isLoading = false; // Set loading back to false when done
    }
  };
}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;
