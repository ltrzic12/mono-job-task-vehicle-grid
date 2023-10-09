import { makeObservable, observable, action } from "mobx";
import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import vehicleModelService from "../../services/VehicleModelService";

class EditModelStore extends Form {
  modelID = null;
  makeID = null;

  constructor() {
    super();
    makeObservable(this, {
      modelID: observable,
      makeID: observable,
      setMakeID: action,
      setModelID: action,
    });
  }

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
          label: "New name",
          placeholder: "Enter new Model name",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "newAbbreviation",
          label: "New abbreviation",
          placeholder: "Enter new abbreviation",
          rules: "required|string|between:1,25",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        console.log("Form validation successful");
        console.log("Form values:", form.values());

        await vehicleModelService.editVehicleModel(
          form.values().modelName,
          form.values().newAbbreviation,
          this.modelID,
        );

        alert("Model updated successfully!");
        form.clear();
      },
      onError(form) {
        console.error("Form validation errors:", form.errors());
      },
    };
  }

  setModelID(modelID) {
    this.modelID = modelID;
  }

  setMakeID(makeID) {
    this.makeID = makeID;
  }
}

export const editModelForm = new EditModelStore();
