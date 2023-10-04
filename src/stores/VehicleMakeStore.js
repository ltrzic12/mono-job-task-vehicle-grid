import { action, makeObservable, observable } from "mobx";

class VehicleMakeStore {
  isLoading = false;
  vehicleMakes = [];
  ascending = true;
  selectedSort = "name";
  page = "makes";
  startAt = 0;
  endAt = 8;
  pageSize = 9;
  totalNumberOfData = 0;
  numberOfPages = 0;
  fetchError = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      vehicleMakes: observable,
      ascending: observable,
      selectedSort: observable,
      page: observable,
      startAt: observable,
      endAt: observable,
      totalNumberOfData: observable,
      numberOfPages: observable,
      fetchError: observable,
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
    this.startAt += 8;
    this.endAt += 8;
  }

  async decrementPageIndex() {
    if (this.startAt > 0) {
      this.startAt -= 8;
      this.endAt -= 8;
    }
  }

  resetPageIndex() {
    this.startAt = 0;
    this.endAt = 8;
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
