import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { newModelForm } from "../../stores/form/AddNewModelStore";
import vehicleMakeService from "../../services/VehicleMakeService";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const AddNewModel = observer(({ form }) => {
  useEffect(() => {
    form.clear();
    const fetchMakes = async () => {
      await vehicleMakeService.fetchVehicleMakes();
    };
    fetchMakes();
  }, [form]);

  return (
    <form onSubmit={form.onSubmit} className='form'>
      <h2>Add new model</h2>
      <label htmlFor={newModelForm.$("modelName").id}>
        {newModelForm.$("modelName").label}
      </label>
      <br />
      <input {...newModelForm.$("modelName").bind()} />
      <p>{newModelForm.$("modelName").error}</p>
      <label htmlFor={newModelForm.$("newAbbreviation").id}>
        {newModelForm.$("newAbbreviation").label}
      </label>
      <br />
      <input {...newModelForm.$("newAbbreviation").bind()} />
      <p>{newModelForm.$("newAbbreviation").error}</p>
      <label htmlFor={newModelForm.$("modelMaker").id}>
        {newModelForm.$("modelMaker").label}
      </label>
      <br />
      <select {...newModelForm.$("modelMaker").bind()}>
        <option value=''>Select Model Maker</option>
        {vehicleMakeStore.vehicleMakes.map((make) => (
          <option key={make.id} value={make.id}>
            {make.name}
          </option>
        ))}
      </select>
      <p>{newModelForm.$("modelMaker").error}</p>
      <div className='buttons'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={newModelForm.onClear}>
          Clear
        </button>
      </div>
      <p>{newModelForm.error}</p>
    </form>
  );
});

const AddNewModelModul = () => <AddNewModel form={newModelForm} />;
export default AddNewModelModul;
