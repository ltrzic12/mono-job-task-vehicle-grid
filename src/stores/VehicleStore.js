import { action, makeObservable, observable } from "mobx";
import supabase from "../config/supabaseClient";

class VehicleStore {
  isLoading = false;
  vehicleMakes = [];
  vehicleModels = [];
  fetchError = null;
  ascending = true;
  page = "makes";
  selectedSort = "name";
  selectedMakeID = "";
  startAt = 0;
  endBefore = 8;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      page: observable,
      selectedSort: observable,
      selectedMakeID: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      changeSelectedDirection: action,
      incrementPageIndex: action,
      decrementPageIndex: action,
      replaceModels: action,
      replaceMakes: action,
      changePage: action,
      changeFilter: action,
      setSelectedSort: action,
    });
  }

  fetchVehicleMakes = async () => {
    let query = supabase
      .from("VehicleMake")
      .select()
      .order(this.selectedSort, { ascending: this.ascending });

    if (this.page === "makes") {
      query = query.range(this.startAt, this.endBefore);
    }

    const { data, error } = await query;

    if (error) {
      this.setFetchError("Error");
      this.replaceMakes(null);
      console.log(error);
    }

    if (data) {
      this.replaceMakes(data);
      this.setFetchError(null);
    }
  };

  fetchVehicleModels = async () => {
    let query = supabase
      .from("VehicleModel")
      .select()
      .order(this.selectedSort, { ascending: this.ascending })
      .range(this.startAt, this.endBefore);
    if (this.selectedMakeID !== "") {
      query = query.eq("makeId", this.selectedMakeID);
    }

    const { data, error } = await query;

    if (error) {
      this.setFetchError("Error");
      this.replaceModels(null);
      console.log(error);
    }
    if (data) {
      this.replaceModels(data);
      this.setFetchError(null);
    }
  };

  setLoading(boolean) {
    this.isLoading = boolean;
  }

  setFetchError(error) {
    this.fetchError = error;
  }

  findMakeNameById(makeId) {
    const make = this.vehicleMakes.find((make) => (make.id = makeId));
    return make ? make.name : "Unknown";
  }

  replaceMakes(makes) {
    this.vehicleMakes.replace(makes || []);
  }

  replaceModels(models) {
    this.vehicleModels = models;
  }

  changePage(page) {
    this.page = page;
  }

  changeSelectedDirection(a) {
    this.ascending = a;
  }

  changeSelectedSort(a) {
    this.selectedSort = a;
  }

  changeFilter(filter, type) {
    this.filter = filter;
  }

  async changeSelectedMakeID(makeID) {
    this.selectedMakeID = makeID;
    await this.fetchVehicleModels();
  }

  async incrementPageIndex() {
    this.startAt += 8;
    this.endBefore += 8;
    if (this.page === "makes") {
      await this.fetchVehicleMakes();
    } else await this.fetchVehicleModels();
    console.log(this.startAt, this.endBefore);
  }

  async decrementPageIndex() {
    if (this.startAt > 0) {
      this.startAt -= 8;
      this.endBefore -= 8;
    }
    if (this.page === "makes") {
      await this.fetchVehicleMakes();
    } else await this.fetchVehicleModels();
    console.log(this.startAt, this.endBefore);
  }

  resetPageIndex() {
    this.startAt = 0;
    this.endBefore = 8;
  }

  resetAllFilters() {
    this.changeSelectedSort("name");
    this.changeSelectedDirection(true);
    this.changeSelectedMakeID("");
  }

  setSelectedSort(a) {
    this.selectedSort = a;
    this.fetchVehicleModels();
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
