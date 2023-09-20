import { makeObservable, observable, action } from "mobx";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../config/firebaseConfig";

class VehicleMakeStore {
  vehicleMakes = [];
  isLoading = false;
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      isLoading: observable,
      fetchVehicleMakes: action,
      currentPage: observable,
      pageSize: observable,
      totalItems: observable,
      setPage: action,
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

  stopListeningToChanges() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  findMakeNameById(makeId) {
    const make = this.vehicleMakes.find((make) => (make.id = makeId));
    return make ? make.name : "Unknown";
  }

  setPage(page) {
    this.currentPage = page;
    this.fetchVehicleMakes();
  }
}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;
