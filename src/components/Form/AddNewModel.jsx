import React, { useEffect, useState } from "react";
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
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newModelForm.onSubmit(); // This will trigger Mobx-React-Form validation
      if (newModelForm.isValid) {
        // The form is valid, proceed to add the new model to your database
        const { modelName, newAbbreviation, modelMaker } = form.values(); // Destructure the form data
        await vehicleModelService.createModel(
          modelName,
          newAbbreviation,
          modelMaker,
        ); // Pass the values to the function
        alert("New make added successfully!"); // Show success message
        form.clear(); // Clear the form after successful submission
      }
    } catch (error) {
      alert("Error submitting the form. Please check your inputs.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={newModelForm.$("modelName").id}>
        {newModelForm.$("modelName").label}
      </label>
      <input {...newModelForm.$("modelName").bind()} />
      <p>{newModelForm.$("modelName").error}</p>

      <label htmlFor={newModelForm.$("newAbbreviation").id}>
        {newModelForm.$("newAbbreviation").label}
      </label>
      <input {...newModelForm.$("newAbbreviation").bind()} />
      <p>{newModelForm.$("newAbbreviation").error}</p>

      <label htmlFor={newModelForm.$("modelMaker").id}>
        {newModelForm.$("modelMaker").label}
      </label>
      <select {...newModelForm.$("modelMaker").bind()}>
        <option value=''>Select Model Maker</option>
        {vehicleMakeStore.vehicleMakes.map((make) => (
          <option key={make.id} value={make.id}>
            {make.name}
          </option>
        ))}
      </select>
      <p>{newModelForm.$("modelMaker").error}</p>

      <button type='submit'>Submit</button>
      <button type='button' onClick={newModelForm.onClear}>
        Clear
      </button>
      <button type='button' onClick={newModelForm.onReset}>
        Reset
      </button>

      <p>{newModelForm.error}</p>
    </form>
  );
});

const AddNewModelModul = () => <AddNewModel form={newModelForm} />;
export default AddNewModelModul;
