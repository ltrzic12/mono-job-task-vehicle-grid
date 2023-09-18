import { action, makeObservable, observable } from "mobx";

class Form {
  formType = "";
  name = "";
  abrv = "";
  makeId = "";
  submitSuccessful = false;
  editModelID = null;

  constructor() {
    makeObservable(this, {
      formType: observable,
      setFormType: action,
      name: observable,
      abrv: observable,
      makeId: observable,
      editModelID: observable,
      setName: action,
      setAbrv: action,
      setMakeId: action,
      submitSuccessful: observable,
      setSubmitSuccessful: action,
      populateFormData: action,
      setEditModelId: action,
    });
  }

  setFormType(type) {
    this.formType = type;
  }

  setName(name) {
    this.name = name;
  }

  setAbrv(abrv) {
    this.abrv = abrv;
  }

  setMakeId(makeId) {
    this.makeId = makeId;
  }

  resetForm() {
    this.name = "";
    this.abrv = "";
    this.makeId = "";
  }

  setSubmitSuccessful() {
    this.submitSuccessful = !this.submitSuccessful;
  }

  populateFormData(name, abrv, makeId) {
    this.name = name;
    this.abrv = abrv;
    this.makeId = makeId;
  }

  setEditModelId(id) {
    this.editModelID = id;
  }
  setEditMakeId(id) {
    this.editMakeId = id;
  }
}

const form = new Form();
export default form;
