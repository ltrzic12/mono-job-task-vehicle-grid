import { makeObservable, observable, action } from "mobx";
import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import vehicleMakeService from "../../services/VehicleMakeService";

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
          label: "New make Name",
          placeholder: "Enter Make Name",
          rules: "required|string",
          value: "",
        },
        {
          name: "makeAbbr",
          label: "New abbreviation",
          placeholder: "Enter Abbreviation",
          rules: "required|string",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        console.log("Validation successful");
        console.log("Values:", form.values());

        try {
          await vehicleMakeService.editVehicleMake(
            form.values().makeName,
            form.values().makeAbbr,
            this.makeID,
          );

          alert("Make updated successfully!");
          form.clear();
        } catch (error) {
          alert("Error submitting the form. Please check your inputs.");
          console.error("Form submission error:", error);
        }
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
