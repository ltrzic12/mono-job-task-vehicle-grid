import {
  collection,
  limit,
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
  page = "makes";
  start = 0;
  isLoading = false;

  limit = 6;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      limit: observable,
      start: observable,
      page: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      fetchMore: action,
    });
  }

  fetchVehicleMakes = async (sort) => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleMake");
      let queryConstraint;

      if (this.page === "makes")
        queryConstraint = query(collectionRef, limit(this.limit));
      else queryConstraint = query(collectionRef);
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
      } else {
        queryConstraint = query(queryConstraint, orderBy("name", "asc"));
      }

      queryConstraint = query(
        queryConstraint,

        limit(this.limit),
      );

      const unsubscribe = onSnapshot(queryConstraint, (snapshot) => {
        const models = [];
        snapshot.forEach((doc) => {
          models.push({ id: doc.id, ...doc.data() });
        });

        action(() => {
          this.vehicleModels.replace(models);
        })();
      });

      this.unsubscribe = unsubscribe;
    } catch (error) {
      console.error("Error fetching Vehicle Models:", error);
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

  fetchMore() {
    this.limit += 6;
  }

  resetPageLimit() {
    this.limit = 6;
  }

  replaceMakes(makes) {
    this.vehicleMakes.replace(makes);
  }
  changePage(page) {
    this.page = page;
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
