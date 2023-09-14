import { observer } from "mobx-react";
import { useEffect } from "react";
import vehicleMakeService from "../../services/VehicleMakeService";
import makeFormStore from "../../stores/MakeFormStore";

const AddMakeForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    vehicleMakeService.createMake(makeFormStore.name, makeFormStore.abrv);
    makeFormStore.resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={makeFormStore.name}
          onChange={(e) => makeFormStore.updateField("name", e.target.value)}
        />
      </label>
      <label>
        Abrv:
        <input
          type='text'
          value={makeFormStore.abrv}
          onChange={(e) => makeFormStore.updateField("abrv", e.target.value)}
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default observer(AddMakeForm);
