import { collection, onSnapshot, query } from "firebase/firestore";
import { action, makeObservable, observable } from "mobx";
import db from "../config/firebaseConfig";

class VehicleModelStore {
  vehicleModels = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      vehicleModels: observable,
      isLoading: observable,
      fetchVehicleModels: action,
    });
  }

  fetchVehicleModels = async () => {
    try {
      this.isLoading = true;
      const vehicleModelCollection = query(collection(db, "VehicleModel"));

      const unsubscribe = onSnapshot(vehicleModelCollection, (snapshot) => {
        const models = [];
        snapshot.forEach((doc) => {
          models.push({ id: doc.id, ...doc.data() });
        });

        this.vehicleModels = models;
      });

      this.unsubscribe = unsubscribe;
    } catch (error) {
      console.error("Error fetching VehicleMakes:", error);
    } finally {
      this.isLoading = false;
    }
  };
  stopListeningToChanges() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
