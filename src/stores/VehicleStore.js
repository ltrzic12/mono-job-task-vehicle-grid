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
  endAt = 8;
  totalNumberOfData = 0;
  numberOfPages = 0;

  constructor() {
    makeObservable(this, {
      vehicleMakes: observable,
      vehicleModels: observable,
      isLoading: observable,
      page: observable,
      selectedSort: observable,
      selectedMakeID: observable,
      startAt: observable,
      endAt: observable,
      totalNumberOfData: observable,
      numberOfPages: observable,
      fetchVehicleMakes: action,
      fetchVehicleModels: action,
      changeSelectedDirection: action,
      incrementPageIndex: action,
      decrementPageIndex: action,
      replaceModels: action,
      replaceMakes: action,
      changePage: action,
      changeFilter: action,
      resetPageIndex: action,
      resetAllFilters: action,
      setSelectedSort: action,
      setNumberOfPage: action,
      setTotalNumberOfData: action,
    });
  }

  async calculateNumberOfData(collection) {
    try {
      const { data, error } = await supabase.from(collection).select("id");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        this.setTotalNumberOfData(data.length);
        this.numberOfPages = Math.ceil(data.length / (this.endAt + 1));
      }
    } catch (error) {
      console.error("Error calculating total number of items:", error);
    }
  }

  fetchVehicleMakes = async () => {
    this.setLoading(true);
    let query = supabase
      .from("VehicleMake")
      .select()
      .order(this.selectedSort, { ascending: this.ascending });

    if (this.page === "makes") {
      query = query.range(this.startAt, this.endAt);
    }

    const { data, error } = await query;

    if (error) {
      this.setFetchError("Error");
      this.replaceMakes(null);
      console.log(error);
      this.setLoading(false);
    }

    if (data) {
      this.replaceMakes(data);
      await this.calculateNumberOfData("VehicleMake");
      this.setFetchError(null);
      this.setLoading(false);
    }
  };

  fetchVehicleModels = async () => {
    this.setLoading(true);
    let query = supabase
      .from("VehicleModel")
      .select()
      .order(this.selectedSort, { ascending: this.ascending })
      .range(this.startAt, this.endAt);

    if (this.selectedMakeID !== "") {
      query = query.eq("makeId", this.selectedMakeID);
    }

    const { data, error } = await query;

    if (error) {
      this.setFetchError("Error");
      this.replaceModels(null);
      console.log(error);
      this.setLoading(false);
    }
    if (data) {
      this.replaceModels(data);
      await this.calculateNumberOfData("VehicleModel");
      console.log(
        "Ukupno modela u bazi: ",
        this.totalNumberOfData,
        "Ukupno stranica: ",
        this.numberOfPages,
        "Povučeni modeli: ",
        this.models,
      );
      this.setFetchError(null);
      this.setLoading(false);
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

  async changeSelectedMakeID(makeID) {
    this.selectedMakeID = makeID;
    await this.fetchVehicleModels();
  }

  async incrementPageIndex() {
    this.startAt += 8;
    this.endAt += 8;
    if (this.page === "makes") {
      await this.fetchVehicleMakes();
    } else await this.fetchVehicleModels();
    console.log(this.startAt, this.endAt);
  }

  async decrementPageIndex() {
    if (this.startAt > 0) {
      this.startAt -= 8;
      this.endAt -= 8;
    }
    if (this.page === "makes") {
      await this.fetchVehicleMakes();
    } else await this.fetchVehicleModels();
    console.log(this.startAt, this.endAt);
  }

  resetPageIndex() {
    this.startAt = 0;
    this.endAt = 8;
  }

  resetAllFilters() {
    this.changeSelectedSort("name");
    this.changeSelectedDirection(true);
    this.changeSelectedMakeID("");
  }

  setSelectedSort(sort) {
    this.selectedSort = sort;
    this.fetchVehicleModels();
  }

  setTotalNumberOfData(number) {
    this.totalNumberOfData = number;
  }

  setNumberOfPage(pages) {
    this.numberOfPages = pages;
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;
