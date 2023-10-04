import { action, makeObservable, observable } from "mobx";
import vehicleMakeService from "../services/VehicleMakeService";
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
      submitForm: action,
      populateFormData: action,
      setEditModelId: action,
      setIsLoading: action,
      setFormError: action,
      setSubmitSuccessful: action,
    });
  }

  async submitForm() {
    try {
      form.setIsLoading(true);
      if (this.formType === "new model") {
        if (!form.name || !form.abrv || form.makeId === "") {
          console.error("Please fill in all the fields!");
          form.setFormError(true);
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
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields");
          form.setFormError(true);
          return;
        }
        await vehicleMakeService.createMake(form.name, form.abrv);

        form.setSubmitSuccessful(true);
      }
      if (this.formType === "edit model") {
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields!");
          form.setFormError(true);
          return;
        }

        await vehicleModelService.editVehicleModel(
          this.name,
          this.abrv,
          this.editModelID,
        );
        console.log("ID of the model updated:", this.editModelID);
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
