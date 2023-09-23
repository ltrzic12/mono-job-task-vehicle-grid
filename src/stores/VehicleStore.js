import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { action, makeObservable, observable } from "mobx";
import db from "../config/firebaseConfig";
import { act } from "react-dom/test-utils";

class VehicleStore {
  vehicleMakes = [];
  vehicleModels = [];
  lastElements = [];
  isLoading = false;
  start = 0;
  limit = 5;
  lastVisible = null;
  pageIndex = 1;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      start: observable,
      lastVisible: observable,
      lastElements: observable,
      pageIndex: observable,
      limit: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      nextIndex: action,
      previousIndex: action,
    });
  }

  fetchVehicleMakes = async (sort) => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleMake");
      let queryConstraint = query(collectionRef);

      if (sort) {
        queryConstraint = query(queryConstraint, orderBy("name", sort));
      } else {
        queryConstraint = query(collectionRef, orderBy("name", "asc"));
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

      let frameIndex = this.pageIndex - 1;

      if (frameIndex <= 0) {
        queryConstraint = query(queryConstraint, limit(this.limit));
      } else {
        queryConstraint = query(
          queryConstraint,
          startAfter(this.lastElements[frameIndex - 1]),
          limit(this.limit),
        );
      }

      const unsubscribe = onSnapshot(queryConstraint, (snapshot) => {
        const models = [];
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];

        snapshot.forEach((doc) => {
          console.log(queryConstraint);
          console.log(doc);
          models.push({ id: doc.id, ...doc.data() });
        });

        action(() => {
          this.vehicleModels.replace(models);
          if (this.pageIndex > this.lastElements.length) {
            this.lastVisible = lastVisible;
            this.lastElements.push(this.lastVisible);
          }
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

  nextIndex() {
    this.pageIndex += 1;
  }

  previousIndex() {
    this.pageIndex -= 1;
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
