import { action, makeObservable, observable } from "mobx";

class VehicleMakeStore {
  isLoading = false;
  vehicleMakes = [];
  ascending = true;
  selectedSort = "name";
  pageType = "makes";
  startAt = 0;
  endAt = 5;
  pageSize = 6;
  totalNumberOfData = 0;
  numberOfPages = 0;
  fetchError = null;
  currentPage = 1;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      vehicleMakes: observable,
      ascending: observable,
      selectedSort: observable,
      pageType: observable,
      startAt: observable,
      endAt: observable,
      totalNumberOfData: observable,
      numberOfPages: observable,
      fetchError: observable,
      currentPage: observable,
      setLoading: action,
      setFetchError: action,
      findMakeNameById: action,
      replaceMakes: action,
      changeSelectedDirection: action,
      changeSelectedSort: action,
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

  replaceMakes(makes) {
    this.vehicleMakes = makes;
  }

  changeSelectedDirection(a) {
    this.ascending = a;
  }

  changeSelectedSort(a) {
    this.selectedSort = a;
  }

  async incrementPageIndex() {
    this.startAt += this.pageSize;
    this.endAt += this.pageSize;
  }

  async decrementPageIndex() {
    if (this.startAt > 0) {
      this.startAt -= this.pageSize;
      this.endAt -= this.pageSize;
    }
  }

  resetPageIndex() {
    this.startAt = 0;
    this.endAt = 5;
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

  setPageType(a) {
    this.pageType = a;
  }

  resetAllFilters() {
    this.changeSelectedSort("name");
    this.changeSelectedDirection(true);
  }

  setTotalNumberOfData(number) {
    this.totalNumberOfData = number;
  }

  setNumberOfPage(pages) {
    this.numberOfPages = pages;
  }
}

const vehicleMakeStore = new VehicleMakeStore();

export default vehicleMakeStore;
