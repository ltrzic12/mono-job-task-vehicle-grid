import { observer } from "mobx-react";
import form from "../../stores/FormStore";
import "./form.css";
import formService from "../../services/FormService";
import FormSuccessul from "./FormSuccessul";
import vehicleStore from "../../stores/VehicleStore";
import Loader from "../Loader/Loader";

const Form = () => {
  let type = form.formType;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form.name);
    formService.submitForm();
  };

  return !form.isLoading ? (
    <>
      <div className='form-page'>
        {!form.submitSuccessful ? (
          <>
            <div>
              {form.formType === "new make" && <h1>Add new make</h1>}
              {form.formType === "new model" && <h1>Add new model</h1>}
              {type === "edit model" && <h1>Edit vehicle info</h1>}
              {type === "edit make" && <h1>Edit make info</h1>}
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>{`Enter new ${form.formType} name`}</label>
              <input
                type='text'
                value={form.name}
                onChange={(e) => form.setName(e.target.value)}
              />
              <label htmlFor='abrv'>{`Enter new ${form.formType} abbreviation`}</label>
              <input
                type='text'
                name='abrv'
                value={form.abrv}
                onChange={(e) => form.setAbrv(e.target.value)}
              />
              {form.formType === "new model" && (
                <div>
                  <select
                    name='maker'
                    id=''
                    value={form.makeId}
                    onChange={(e) => form.setMakeId(e.target.value)}>
                    <option value=''>Select maker</option>
                    {vehicleStore.vehicleMakes.map((vehicle) => (
                      <option value={vehicle.id} key={vehicle.id}>
                        {vehicle.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {form.formError === true && (
                <span>Please fill in all the fields!</span>
              )}
              <button type='submit'>Submit</button>
            </form>
          </>
        ) : (
          <FormSuccessul></FormSuccessul>
        )}
      </div>
    </>
  ) : (
    <Loader></Loader>
  );
};

export default observer(Form);
