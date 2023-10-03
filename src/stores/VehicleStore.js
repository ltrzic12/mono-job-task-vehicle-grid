import {
  collection,
  endBefore,
  getDocsFromServer,
  getCountFromServer,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { action, makeObservable, observable } from "mobx";
import db from "../config/firebaseConfig";

class VehicleStore {
  isLoading = false;
  vehicleMakes = [];
  vehicleModels = [];
  vehicleModelsDocs;
  lastPageIndex = -1;

  page = "makes";
  selectedSort = "name";
  selectedDirection = "asc";
  selectedMakeID = "";
  pageSize = 6;
  startAt = "";
  pageIndex = 1;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      page: observable,
      // true increment, false decrement
      selectedSort: observable,
      selectedMakeID: observable,
      pageSize: observable,
      startAt: observable,
      selectedDirection: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      changeSelectedDirection: action,
      incrementPageIndex: action,
      decrementPageIndex: action,

      replaceModels: action,
      replaceMakes: action,
      changePage: action,
      changeSelectedMakeID: action,
      resetPageIndex: action,
    });
  }

  fetchVehicleMakes = async (sort) => {
    try {
      this.isLoading = true;
      const collectionRef = collection(db, "VehicleMake");
      let queryConstraint;

      if (this.page === "makes")
        queryConstraint = query(collectionRef, limitToLast(this.limit));
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

  fetchVehicleModels = async (isNext) => {
    this.setLoading(true);
    try {
      const collectionRef = collection(db, "VehicleModel");
      this.lastPageIndex = await getCountFromServer(collectionRef).then(
        (resp) => {
          return Math.ceil(resp.data().count / this.pageSize);
        },
      );
      let queryConstraint = query(
        collectionRef,
        limitToLast(this.pageSize),
        orderBy(this.selectedSort, this.selectedDirection),
      );

      if (this.selectedMakeID !== "") {
        queryConstraint = query(
          queryConstraint,
          where("makeId", "==", this.selectedMakeID),
        );
      }
      if (this.pageIndex === 1) {
        queryConstraint = query(queryConstraint, startAt(0));
      } else {
        if (isNext) {
          queryConstraint = query(
            queryConstraint,
            startAfter(this.vehicleModelsDocs.docs[this.pageSize - 1]),
          );
        } else {
          queryConstraint = query(
            queryConstraint,
            limitToLast(this.vehicleModelsDocs.docs[0]),
          );
        }
      }
      this.vehicleModelsDocs = await getDocsFromServer(queryConstraint);

      this.replaceModels(
        this.vehicleModelsDocs.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      );
    } catch (error) {
      console.error("Error fetching Vehicle Models:", error);
    } finally {
      action(() => {
        this.setLoading(false);
      })();
    }
  };

  stopListeningToChanges() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setLoading(boolean) {
    this.isLoading = boolean;
  }
  findMakeNameById(makeId) {
    const make = this.vehicleMakes.find((make) => (make.id = makeId));
    return make ? make.name : "Unknown";
  }

  replaceMakes(makes) {
    this.vehicleMakes.replace(makes);
  }

  replaceModels(models) {
    this.vehicleModels.replace(models);
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

  async incrementPageIndex() {
    this.pageIndex++;
    await vehicleStore.fetchVehicleModels(true);
  }

  async decrementPageIndex() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      await vehicleStore.fetchVehicleModels(false);
    }
  }

  resetPageIndex() {
    this.pageIndex = 1;
    vehicleStore.fetchVehicleModels();
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
