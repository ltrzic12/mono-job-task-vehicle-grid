import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { newModelForm } from "../../stores/form/AddNewModelStore";
import vehicleMakeService from "../../services/VehicleMakeService";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import vehicleModelService from "../../services/VehicleModelService";

const AddNewModel = observer(({ form }) => {
  useEffect(() => {
    form.clear();
    const fetchMakes = async () => {
      await vehicleMakeService.fetchVehicleMakes();
    };
    fetchMakes();
  }, [form]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newModelForm.onSubmit();
      if (newModelForm.isValid) {
        const { modelName, newAbbreviation, modelMaker } = form.values();
        await vehicleModelService.createModel(
          modelName,
          newAbbreviation,
          modelMaker,
        );
        alert("New make added successfully!");
        form.clear();
      }
    } catch (error) {
      alert("Error submitting the form. Please check your inputs.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
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
