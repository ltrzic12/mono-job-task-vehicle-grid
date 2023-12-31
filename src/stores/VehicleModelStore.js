import { action, makeObservable, observable } from "mobx";
import vehicleMakeStore from "./VehicleMakeStore";

class VehicleModelStore {
  isLoading = false;
  vehicleModels = [];
  ascending = true;
  selectedSort = "name";
  selectedMakeID = "";
  startAt = 0;
  endAt = 8;
  pageSize = 9;
  totalNumberOfData = 0;
  numberOfPages = 0;
  currentPage = 1;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      vehicleModels: observable,
      ascending: observable,
      selectedSort: observable,
      selectedMakeID: observable,
      startAt: observable,
      pageSize: observable,
      endAt: observable,
      totalNumberOfData: observable,
      numberOfPages: observable,
      currentPage: observable,
      setLoading: action,
      setFetchError: action,
      findMakeNameById: action,
      replaceModels: action,
      changeSelectedDirection: action,
      changeSelectedSort: action,
      changeSelectedMakeID: action,
      incrementPageIndex: action,
      decrementPageIndex: action,
      resetPageIndex: action,
      resetAllFilters: action,
      setTotalNumberOfData: action,
      setNumberOfPage: action,
      setPage: action,
      setCurrentPage: action,
    });
  }

  setLoading(boolean) {
    this.isLoading = boolean;
  }

  setFetchError(error) {
    this.fetchError = error;
  }

  findMakeNameById(makeId) {
    const make = vehicleMakeStore.vehicleMakes.find(
      (make) => (make.id = makeId),
    );
    return make ? make.name : "Unknown";
  }

  replaceModels(models) {
    this.vehicleModels = models;
  }

  changeSelectedDirection(a) {
    this.ascending = a;
  }

  changeSelectedSort(a) {
    this.selectedSort = a;
  }

  async changeSelectedMakeID(makeID) {
    this.selectedMakeID = makeID;
  }

  async incrementPageIndex() {
    this.startAt += this.pageSize;
    this.endAt += this.pageSize;
    this.currentPage += 1;
  }

  async decrementPageIndex() {
    if (this.startAt > 0) {
      this.startAt -= this.pageSize;
      this.endAt -= this.pageSize;
      this.currentPage -= 1;
    }
  }

  resetPageIndex() {
    this.startAt = 0;
    this.endAt = 8;
    this.currentPage = 1;
  }

  setPage(startAt, endAt, page) {
    this.startAt = startAt;
    this.endAt = endAt;
    this.setCurrentPage(page);
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  resetAllFilters() {
    this.changeSelectedSort("name");
    this.changeSelectedDirection(true);
    this.changeSelectedMakeID("");
  }

  setTotalNumberOfData(number) {
    this.totalNumberOfData = number;
  }

  setNumberOfPage(pages) {
    this.numberOfPages = pages;
  }
}

const vehicleModelStore = new VehicleModelStore();

export default vehicleModelStore;
