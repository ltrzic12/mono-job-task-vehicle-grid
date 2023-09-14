import { action, makeObservable, observable } from "mobx";

class EditFormStore {
  isOpened = false;
  name = "";
  abrv = "";
  makeId = "";

  constructor() {
    makeObservable(this, {
      isOpened: observable,
      name: observable,
      abrv: observable,
      toggleIsOpened: action,
    });
  }

  toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
  updateField = (fieldName, value) => {
    this[fieldName] = value;
  };
  resetForm = () => {
    this.name = "";
    this.abrv = "";
  };
}

const editModelFormStore = new EditFormStore();
export default editModelFormStore;
