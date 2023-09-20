import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { action, makeObservable, observable } from "mobx";
import db from "../config/firebaseConfig";

class VehicleModelStore {
  vehicleModels = [];
  isLoading = false;
  fetchLimit = 9;
  startAt = 0;

  constructor() {
    makeObservable(this, {
      vehicleModels: observable,
      isLoading: observable,
      fetchVehicleModels: action,
    });
  }

  fetchVehicleModels = async (makeId, sort) => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleModel");
      let queryConstraint = query(collectionRef);

      if (makeId) {
        queryConstraint = query(queryConstraint, where("makeId", "==", makeId));
      }

      if (sort) {
        queryConstraint = query(queryConstraint, orderBy("name", sort));
      }

      const unsubscribe = onSnapshot(queryConstraint, (snapshot) => {
        const models = [];
        snapshot.forEach((doc) => {
          models.push({ id: doc.id, ...doc.data() });
        });

        action(() => {
          this.vehicleModels.replace(models);
          this.totalItems = this.vehicleModels.length;
        })();
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
