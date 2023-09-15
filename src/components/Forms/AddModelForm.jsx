import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import modelFormStore from "../../stores/ModelFormStore";
import vehicleModelService from "../../services/VehicleModelService";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const ModelForm = () => {
  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    vehicleModelService.createModel(
      modelFormStore.makeId,
      modelFormStore.name,
      modelFormStore.abrv,
    );
    modelFormStore.resetForm();
  };
  const handleMakeChange = (e) => {
    modelFormStore.updateField("makeId", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make ID:
        <select value={modelFormStore.makeId} onChange={handleMakeChange}>
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
          value={modelFormStore.name}
          onChange={(e) => modelFormStore.updateField("name", e.target.value)}
        />
      </label>
      <label>
        Abrv:
        <input
          type='text'
          value={modelFormStore.abrv}
          onChange={(e) => modelFormStore.updateField("abrv", e.target.value)}
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default observer(ModelForm);
