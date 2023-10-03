import { action, makeObservable, observable } from "mobx";

class Form {
  formType = "";
  name = "";
  abrv = "";
  id = "";
  makeId = "";
  submitSuccessful = false;
  editModelID = null;
  isLoading = false;
  formError = false;

  constructor() {
    makeObservable(this, {
      formType: observable,
      setFormType: action,
      name: observable,
      abrv: observable,
      makeId: observable,
      editModelID: observable,
      submitSuccessful: observable,
      formError: observable,
      setName: action,
      setAbrv: action,
      setMakeId: action,

      populateFormData: action,
      setEditModelId: action,
      setIsLoading: action,
      setFormError: action,
      setSubmitSuccessful: action,
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
    this.setFormError(false);
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
  setIsLoading = (boolean) => {
    this.isLoading = boolean;
  };

  setFormError(a) {
    this.formError = a;
  }

  setSubmitSuccessful() {
    this.submitSuccessful = !form.submitSuccessful;
    this.setFormError(false);
    this.resetForm();
  }
}

const form = new Form();
export default form;
