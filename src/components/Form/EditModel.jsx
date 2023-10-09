import { observer } from "mobx-react";
import { editModelForm } from "../../stores/form/EditModelStore";
import vehicleModelService from "../../services/VehicleModelService";

const EditModel = observer(() => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editModelForm.onSubmit();
      if (editModelForm.isValid) {
        const { modelName, newAbbreviation } = editModelForm.values();

        await vehicleModelService.editVehicleModel(
          modelName,
          newAbbreviation,
          editModelForm.modelID,
        );

        alert("Model updated successfully!");
        editModelForm.clear();
      }
    } catch (error) {
      alert("Error submitting the form. Please check your inputs.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={editModelForm.$("modelName").id}>
        {editModelForm.$("modelName").label}
      </label>
      <input {...editModelForm.$("modelName").bind()} />
      <p>{editModelForm.$("modelName").error}</p>

      <label htmlFor={editModelForm.$("newAbbreviation").id}>
        {editModelForm.$("newAbbreviation").label}
      </label>
      <input {...editModelForm.$("newAbbreviation").bind()} />
      <p>{editModelForm.$("newAbbreviation").error}</p>

      <button type='submit'>Submit</button>
      <button type='button' onClick={editModelForm.onClear}>
        Clear
      </button>
      <button type='button' onClick={editModelForm.onReset}>
        Reset
      </button>

      <p>{editModelForm.error}</p>
    </form>
  );
});

export default EditModel;