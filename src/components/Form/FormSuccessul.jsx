import { observer } from "mobx-react";
import form from "../../stores/FormStore";
import { Link } from "react-router-dom";

const FormSuccess = () => {
  return (
    <div className='form-success'>
      {form.formType === "new make" && (
        <>
          <h2>New make added</h2>
          <button
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Add new
          </button>
          <Link
            to='/'
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Close
          </Link>
        </>
      )}
      {form.formType === "new model" && (
        <>
          <h2>New model added</h2>
          <button
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Add new
          </button>
          <Link
            to='/models'
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Close
          </Link>
        </>
      )}
      {form.formType === "edit model" && (
        <>
          <h2>Edit successful</h2>
          <Link
            to='/models'
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Close
          </Link>
        </>
      )}
      {form.formType === "edit make" && (
        <>
          <h2>Edit successful</h2>
          <Link
            to='/'
            onClick={() => form.setSubmitSuccessful(!form.submitSuccessful)}>
            Close
          </Link>
        </>
      )}
    </div>
  );
};

export default observer(FormSuccess);
