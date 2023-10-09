import { makeObservable, observable, action } from "mobx";
import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class EditMakeStore extends Form {
  makeID = null;

  constructor() {
    super();
    makeObservable(this, {
      makeID: observable,
      setMakeID: action,
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
          name: "makeName",
          label: "Make Name",
          placeholder: "Enter Make Name",
          rules: "required|string",
          value: "",
        },
        {
          name: "makeAbbr",
          label: "Abbreviation",
          placeholder: "Enter Abbreviation",
          rules: "required|string",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        console.log("Values:", form.values());
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }

  setMakeID(id) {
    this.makeID = id;
  }
}

export const editMakeForm = new EditMakeStore();
