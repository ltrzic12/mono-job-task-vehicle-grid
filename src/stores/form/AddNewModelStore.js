import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

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
          label: "New model Name",
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
        {
          name: "modelMaker",
          label: "Model Maker",
          placeholder: "Select Model Maker",
          rules: "required",
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

export const newModelForm = new AddNewModelForm();
