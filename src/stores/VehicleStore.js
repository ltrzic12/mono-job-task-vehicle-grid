import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { action, makeObservable, observable } from "mobx";
import db from "../config/firebaseConfig";

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];
  isLoading = false;
  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
    });
  }
  fetchVehicleMakes = async (sort) => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleMake");
      let queryConstraint = collectionRef;
      if (sort) {
        queryConstraint = query(queryConstraint, orderBy("name", sort));
      }
      const unsubscribe = onSnapshot(queryConstraint, (snapshot) => {
        const makes = [];
        snapshot.forEach((doc) => {
          makes.push({ id: doc.id, ...doc.data() });
        });

        action(() => {
          this.vehicleMakes.replace(makes);
        })();
      });

      this.unsubscribe = unsubscribe;
    } catch (error) {
      console.error("Error fetching VehicleMakes:", error);
    } finally {
      this.isLoading = false;
    }
  };

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
  findMakeNameById(makeId) {
    const make = this.vehicleMakes.find((make) => (make.id = makeId));
    return make ? make.name : "Unknown";
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
