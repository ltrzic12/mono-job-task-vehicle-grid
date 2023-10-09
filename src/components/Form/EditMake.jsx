import { observer } from "mobx-react";
import { editMakeForm } from "../../stores/form/EditMakeStore";
import vehicleMakeService from "../../services/VehicleMakeService";

const EditMake = observer(() => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editMakeForm.onSubmit();
      if (editMakeForm.isValid) {
        const { makeName, makeAbbr } = editMakeForm.values();

        await vehicleMakeService.editVehicleMake(
          makeName,
          makeAbbr,
          editMakeForm.makeID,
        );

        alert("Make updated successfully!");
        editMakeForm.clear();
      }
    } catch (error) {
      alert("Error submitting the form. Please check your inputs.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={editMakeForm.$("makeName").id}>
        {editMakeForm.$("makeName").label}
      </label>
      <input {...editMakeForm.$("makeName").bind()} />
      <p>{editMakeForm.$("makeName").error}</p>

      <label htmlFor={editMakeForm.$("makeAbbr").id}>
        {editMakeForm.$("makeAbbr").label}
      </label>
      <input {...editMakeForm.$("makeAbbr").bind()} />
      <p>{editMakeForm.$("makeAbbr").error}</p>

      <button type='submit'>Submit</button>
      <button type='button' onClick={editMakeForm.onClear}>
        Clear
      </button>
      <button type='button' onClick={editMakeForm.onReset}>
        Reset
      </button>

      <p>{editMakeForm.error}</p>
    </form>
  );
});

export default EditMake;
