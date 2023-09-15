import { makeObservable, observable, action } from "mobx";

import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../config/firebaseConfig";
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
      this.isLoading = true;
      const vehicleMakesCollection = query(collection(db, "VehicleMake"));

      const unsubscribe = onSnapshot(vehicleMakesCollection, (snapshot) => {
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

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;
