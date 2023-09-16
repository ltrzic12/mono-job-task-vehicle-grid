import vehicleModelService from "../services/VehicleModelService";
import vehicleMakeService from "../services/VehicleMakeService";
import form from "../stores/FormStore";
import { doc } from "firebase/firestore";
import db from "../config/firebaseConfig";

class FormService {
  async submitForm() {
    try {
      if (form.formType === "new model") {
        if (!form.name || !form.abrv || !form.makeId) {
          console.error("Please fill in all the fields!");
          return;
        }
        const modelId = await vehicleModelService.createModel(
          form.makeId,
          form.name,
          form.abrv,
        );
        console.log("Model created with ID:", modelId);
        form.setSubmitSuccessful(true);
      }
      if (form.formType === "new make") {
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields");
          return;
        }
        const makeId = await vehicleMakeService.createMake(
          form.name,
          form.abrv,
        );
        console.log("Make created with ID:", makeId);
      }
      if (form.formType === "edit model") {
        if (!form.name || !form.abrv) {
          console.error("Please fill in all the fields!");
          return;
        }
        let docRef = doc(db, "VehicleModel", form.editModelID);
        let payload = {
          name: form.name,
          abrv: form.abrv,
          makeId: form.makeId,
        };
        await vehicleModelService.editVehicleModel(docRef, payload);
        console.log("ID of the model updated:", form.modelId);
        form.setSubmitSuccessful(true);
        form.setEditModelId(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      form.resetForm();
    }
  }
}

const formService = new FormService();
export default formService;
