import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { newMakeForm } from "../../stores/form/AddNewMakeStore";
import vehicleMakeService from "../../services/VehicleMakeService";

const AddNewMake = observer(({ form }) => {
  useEffect(() => {
    form.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await form.onSubmit(); // This will trigger Mobx-React-Form validation
      if (form.isValid) {
        // The form is valid, proceed to add the new make to your database
        const { makeName, newAbbreviation } = form.values(); // Destructure the form data
        await vehicleMakeService.createMake(makeName, newAbbreviation); // Pass the values to the function
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
      <label htmlFor={form.$("makeName").id}>{form.$("makeName").label}</label>
      <input {...form.$("makeName").bind()} />
      <p>{form.$("makeName").error}</p>

      <label htmlFor={form.$("newAbbreviation").id}>
        {form.$("newAbbreviation").label}
      </label>
      <input {...form.$("newAbbreviation").bind()} />
      <p>{form.$("newAbbreviation").error}</p>

      <button type='submit'>Submit</button>
      <button type='button' onClick={form.onClear}>
        Clear
      </button>
      <button type='button' onClick={form.onReset}>
        Reset
      </button>

      <p>{form.error}</p>
    </form>
  );
});

const AddNewMakeModul = () => <AddNewMake form={newMakeForm} />;
export default AddNewMakeModul; // Export the variable as the default export
