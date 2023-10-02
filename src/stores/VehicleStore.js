import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { action, makeObservable, observable, toJS } from "mobx";
import db from "../config/firebaseConfig";

class VehicleStore {
  isLoading = false;
  vehicleMakes = [];
  vehicleModels = [];
  seenElements = [];
  page = "makes";
  selectedSort = "name";
  selectedDirection = "asc";
  selectedMakeID = "";
  pageSize = 9;
  startAt = "";
  lastStartAt = "";
  pageIndex = 1;
  lastPageIndex = 0;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      page: observable,
      selectedSort: observable,
      selectedMakeID: observable,
      pageSize: observable,
      startAt: observable,
      selectedDirection: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      changeSelectedDirection: action,
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

  fetchVehicleModels = async () => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleModel");
      let queryConstraint = query(
        collectionRef,
        orderBy(this.selectedSort, this.selectedDirection),
        limit(this.pageSize),
      );

      if (this.selectedMakeID !== "") {
        queryConstraint = query(
          queryConstraint,
          where("makeId", "==", this.selectedMakeID),
        );
      }

      let startAfterElement = this.seenElements[this.pageIndex - 2];

      if (this.pageIndex > 1) {
        queryConstraint = query(queryConstraint, startAfter(startAfterElement));
      }

      const unsubscribe = onSnapshot(queryConstraint, (snapshot) => {
        const models = [];

        snapshot.forEach((doc) => {
          models.push({ id: doc.id, ...doc.data() });
        });

        action(() => {
          this.vehicleModels.replace(models);
          if (models.length > 0) {
            this.changeStartAt(models[models.length - 1].name);
            console.log("ovo je novi startAt: ", this.startAt);
            if (this.seenElements.includes(this.startAt)) {
              console.log("Već ima");
            } else {
              this.seenElements.push(this.startAt);
            }

            console.log("ovo su seen elements: ", this.seenElements);
          }
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

  replaceMakes(makes) {
    this.vehicleMakes.replace(makes);
  }

  changePage(page) {
    this.page = page;
  }

  changeSelectedDirection(sort) {
    this.selectedDirection = sort;
  }

  changeSelectedMakeID(makeId) {
    this.selectedMakeID = makeId;
  }

  changeStartAt(start) {
    this.startAt = start;
  }

  changeLastStartAt(start) {
    this.lastStartAt = start;
  }

  incrementPageIndex() {
    this.pageIndex++;
  }

  decrementPageIndex() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
    }
  }

  incrementLastPageIndex() {
    this.lastPageIndex++;
  }

  decrementLastPageIndex() {
    this.lastPageIndex--;
  }

  pushToSeenElements(element) {
    this.seenElements.push(element);
  }

  resetSeenElements() {
    this.seenElements = [];
  }

  resetPageIndex() {
    this.pageIndex = 1;
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
