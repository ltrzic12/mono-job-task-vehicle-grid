import { observer } from "mobx-react";
import vehicleMakeService from "../../services/VehicleMakeService";
import vehicleModelService from "../../services/VehicleModelService";
import editModelFormStore from "../../stores/EditModelFormStore";
import editFormStore from "../../stores/EditModelFormStore";
import vehicleMakeStore from "../../stores/VehicleStore";
import { useEffect } from "react";

const EditModelForm = () => {
  useEffect(() => {
    vehicleMakeService.getVehicleMakes();
  }, []);
  const handleCancel = (e) => {
    e.preventDefault();
    editFormStore.toggleIsOpened();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    vehicleModelService.editVehicleModel(
      editModelFormStore.makeId,
      editModelFormStore.name,
      editModelFormStore.abrv,
    );
    editModelFormStore.resetForm();
  };
  const handleMakeChange = (e) => {
    editFormStore.updateField("makeId", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make ID:
        <select value={editModelFormStore.makeId} onChange={handleMakeChange}>
          <option value=''>Select a Make</option>
          {vehicleMakeStore.vehicleMakes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Name:
        <input
          type='text'
          value={editModelFormStore.name}
          onChange={(e) =>
            editModelFormStore.updateField("name", e.target.value)
          }
        />
      </label>
      <label>
        Abrv:
        <input
          type='text'
          value={editModelFormStore.abrv}
          onChange={(e) =>
            editModelFormStore.updateField("abrv", e.target.value)
          }
        />
      </label>
      <button type='submit'>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default observer(EditModelForm);
