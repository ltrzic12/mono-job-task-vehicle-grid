import React from "react";
import { observer } from "mobx-react-lite";

import modelFormStore from "../../stores/ModelFormStore";
import vehicleModelService from "../../services/VehicleModelService";

const ModelForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    vehicleModelService.createModel(
      modelFormStore.makeId,
      modelFormStore.name,
      modelFormStore.abrv,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make ID:
        <input
          type='text'
          value={modelFormStore.makeId}
          onChange={(e) => modelFormStore.updateField("makeId", e.target.value)}
        />
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
