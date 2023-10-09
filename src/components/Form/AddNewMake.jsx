import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { newMakeForm } from "../../stores/form/AddNewMakeStore";
import vehicleMakeService from "../../services/VehicleMakeService";
import "./form.css";

const AddNewMake = observer(({ form }) => {
  useEffect(() => {
    form.clear();
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await form.onSubmit();
      if (form.isValid) {
        const { makeName, newAbbreviation } = form.values();
        await vehicleMakeService.createMake(makeName, newAbbreviation);
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
      <h2>Add new Make</h2>
      <label htmlFor={form.$("makeName").id}>
        {form.$("makeName").label}
      </label>{" "}
      <br />
      <input {...form.$("makeName").bind()} />
      <p>{form.$("makeName").error}</p>
      <label htmlFor={form.$("newAbbreviation").id}>
        {form.$("newAbbreviation").label}
      </label>{" "}
      <br />
      <input {...form.$("newAbbreviation").bind()} />
      <p>{form.$("newAbbreviation").error}</p>
      <div className='buttons'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={form.onClear}>
          Clear
        </button>
      </div>
      <p>{form.error}</p>
    </form>
  );
});

const AddNewMakeModul = () => <AddNewMake form={newMakeForm} />;
export default AddNewMakeModul;
