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
    const { data, error } = await supabase
      .from("VehicleMake")
      .select()
      .order("name", { ascending: this.ascending });

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
    const { data, error } = await supabase
      .from("VehicleModel")
      .select()
      .order(this.selectedSort, { ascending: this.ascending });

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

  changeFilter(filter) {
    this.filter = filter;
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

  setSelectedSort(a) {
    this.selectedSort = a;
    this.fetchVehicleModels();
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
