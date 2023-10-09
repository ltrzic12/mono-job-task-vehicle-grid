import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

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
          label: "New make name",
          placeholder: "Enter new Make name",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "newAbbreviation",
          label: "New make abbreviation",
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
        console.log("Values:", form.values);
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

export const newMakeForm = new AddNewMakeForm();
