import { action, makeObservable, observable } from "mobx"; // For Mobx state management
import vehicleMakeService from "../services/VehicleMakeService"; // Import your services
import vehicleModelService from "../services/VehicleModelService";

class Form {
  formType = "new model";
  name = "";
  abrv = "";
  id = "";
  makeId = "";
  submitSuccessful = false;
  editModelID = null;
  isLoading = false;
  formError = false;
  nameError = false;
  abrvError = false;
  makeIdError = false;

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
      nameError: observable,
      abrvError: observable,
      makeIdError: observable,
      setName: action,
      setNameError: action,
      setAbrv: action,
      setAbrvError: action,
      setMakeId: action,
      setMakeIdError: action,
      submitForm: action,
      populateFormData: action,
      setEditModelId: action,
      setIsLoading: action,
      setFormError: action,
      setSubmitSuccessful: action,
      resetForm: action,
    });
  }

  async submitForm() {
    try {
      form.setIsLoading(true);
      let nameError, abrvError, makeIdError;
      if (this.formType === "new model") {
        nameError = this.validateName(form.name);
        abrvError = this.validateName(form.abrv);
        makeIdError = this.validateMakeID(form.makeId);

        if (nameError || abrvError || makeIdError) {
          this.setNameError(nameError);
          this.setAbrvError(abrvError);
          this.setMakeIdError(makeIdError);
          return;
        }
        await vehicleModelService.createModel(
          form.name,
          form.abrv,
          form.makeId,
        );

        form.setSubmitSuccessful(true);
      }
      if (this.formType === "new make") {
        nameError = this.validateName(form.name);
        abrvError = this.validateAbrv(form.abrv);
        if (nameError || abrvError) {
          this.setNameError(nameError);
          this.setAbrvError(abrvError);
          return;
        }
        await vehicleMakeService.createMake(form.name, form.abrv);

        form.setSubmitSuccessful(true);
      }
      if (this.formType === "edit model") {
        nameError = this.validateName(form.name);
        abrvError = this.validateName(form.abrv);
        if (nameError || abrvError) {
          this.setNameError(nameError);
          this.setAbrvError(abrvError);

          return;
        }
        await vehicleModelService.editVehicleModel(
          this.name,
          this.abrv,
          this.editModelID,
        );
        this.setSubmitSuccessful();
        this.setEditModelId(null);
      }
      if (this.formType === "edit make") {
        console.log(this.makeId);
        if (!form.name || !this.abrv) {
          console.error("Please fill in all the fields!");
          this.setFormError(true);
          return;
        }

        await vehicleMakeService.editVehicleMake(
          this.name,
          this.abrv,
          this.makeId,
        );
        console.log("ID of the model updated:", this.makeId);
        this.setSubmitSuccessful();
        this.setMakeId(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.setIsLoading(false);
    }
  }

  validateName(name) {
    if (!name) {
      return "Name is required!";
    }
    return null;
  }

  validateAbrv(abrv) {
    if (!abrv) {
      return "Abbreviation is required!";
    }
    return null;
  }

  validateMakeID(makeID) {
    if (!makeID || makeID === "") {
      return "Make is required!";
    }
    return null;
  }

  setFormType(type) {
    this.formType = type;
  }

  setName(name) {
    this.name = name;
  }

  setNameError(error) {
    this.nameError = error;
  }

  setAbrv(abrv) {
    this.abrv = abrv;
  }

  setAbrvError(error) {
    this.abrvError = error;
  }

  setMakeId(makeId) {
    this.makeId = makeId;
  }

  setMakeIdError(error) {
    this.makeIdError = error;
  }

  resetForm() {
    this.name = "";
    this.abrv = "";
    this.makeId = "";
    this.abrvError = false;
    this.nameError = false;
    this.makeIdError = false;
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
