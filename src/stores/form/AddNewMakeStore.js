import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import vehicleMakeService from "../../services/VehicleMakeService";

class AddNewMakeForm extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }
  setup() {
    return {
      fields: [
        {
          name: "makeName",
          label: "name",
          placeholder: "Enter new Make name",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "newAbbreviation",
          label: "abrv",
          placeholder: "Enter new abbreviation",
          rules: "required|string|between:1,25",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert("Form is valid!");
        console.log("Values:", form.values);
      },
      onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
      },
    };
  }
}

export const newMakeForm = new AddNewMakeForm();
