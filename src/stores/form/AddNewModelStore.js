import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import vehicleModelService from "../../services/VehicleModelService";
import vehicleMakeService from "../../services/VehicleMakeService";

class AddNewModelForm extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }
  setup() {
    return {
      fields: [
        {
          name: "modelName",
          label: "Model Name",
          placeholder: "Enter new Model name",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "newAbbreviation",
          label: "Abbreviation",
          placeholder: "Enter new abbreviation",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "modelMaker",
          label: "Model Maker",
          placeholder: "Select Model Maker",
          rules: "required",
          value: "", // Initialize with an empty value
          options: [], // Initialize options as an empty array
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        console.log("Values:", form.values);
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

export const newModelForm = new AddNewModelForm();
