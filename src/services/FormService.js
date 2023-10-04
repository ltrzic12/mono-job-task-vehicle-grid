import vehicleModelService from "../services/VehicleModelService";
import vehicleMakeService from "../services/VehicleMakeService";
import form from "../stores/FormStore";

class FormService {
  async submitForm() {
    try {
      form.setIsLoading(true);
      if (form.formType === "new model") {
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
      if (form.formType === "new make") {
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields");
          form.setFormError(true);
          return;
        }
        await vehicleMakeService.createMake(form.name, form.abrv);

        form.setSubmitSuccessful(true);
      }
      if (form.formType === "edit model") {
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields!");
          form.setFormError(true);
          return;
        }

        await vehicleModelService.editVehicleModel(
          form.name,
          form.abrv,
          form.editModelID,
        );
        console.log("ID of the model updated:", form.editModelID);
        form.setSubmitSuccessful();
        form.setEditModelId(null);
      }
      if (form.formType === "edit make") {
        console.log(form.makeId);
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields!");
          form.setFormError(true);
          return;
        }

        await vehicleMakeService.editVehicleMake(
          form.name,
          form.abrv,
          form.makeId,
        );
        console.log("ID of the model updated:", form.makeId);
        form.setSubmitSuccessful();
        form.setMakeId(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      form.setIsLoading(false);
    }
  }
}

const formService = new FormService();
export default formService;
