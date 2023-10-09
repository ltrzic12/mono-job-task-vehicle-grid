import { makeObservable, observable, action } from "mobx";
import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

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
          label: "name",
          placeholder: "Enter new Model name",
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

  setModelID(modelID) {
    this.modelID = modelID;
  }

  setMakeID(makeID) {
    this.makeID = makeID;
  }
}

export const editModelForm = new EditModelStore();
