import { action, makeObservable, observable } from "mobx";

class MakeFormStore {
  name = "";
  abrv = "";
  makeSuccesful: false;
  constructor() {
    makeObservable(this, {
      name: observable,
      abrv: observable,
      makeSuccesful: observable,
      updateField: action,
      resetForm: action,
    });
  }
  updateField = (fieldName, value) => {
    this[fieldName] = value;
  };
  resetForm = () => {
    this.name = "";
    this.abrv = "";
  };
}

const makeFormStore = new MakeFormStore();
export default makeFormStore;
