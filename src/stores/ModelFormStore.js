import { makeObservable, observable, action } from "mobx";

class ModelFormStore {
  makeId = "";
  name = "";
  abrv = "";
  constructor() {
    makeObservable(this, {
      makeId: observable,
      name: observable,
      abrv: observable,
      updateField: action,
      resetForm: action,
    });
  }
  updateField = (fieldName, value) => {
    this[fieldName] = value;
  };
  resetForm = () => {
    this.makeId = "";
    this.name = "";
    this.abrv = "";
  };
}

const modelFormStore = new ModelFormStore();
export default modelFormStore;
