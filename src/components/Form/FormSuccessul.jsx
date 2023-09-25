import { observer } from "mobx-react";
import form from "../../stores/FormStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { linkStyle } from "../../utils/mics/styles";

const FormSuccess = () => {
  useEffect(() => {
    form.setFormError(false);
  }, []);

  return (
    <div className='wrapper'>
      <div className='form-success'>
        {form.formType === "new make" && (
          <>
            <h3>New make added</h3>
            <div className='success-buttons'>
              <button
                onClick={() =>
                  form.setSubmitSuccessful(!form.submitSuccessful)
                }>
                Add new
              </button>
              <button>
                <Link
                  to='/'
                  onClick={() =>
                    form.setSubmitSuccessful(!form.submitSuccessful)
                  }
                  style={linkStyle}>
                  Close
                </Link>
              </button>
            </div>
          </>
        )}
        {form.formType === "new model" && (
          <>
            <h3>New model added</h3>
            <div className='success-buttons'>
              <button
                onClick={() =>
                  form.setSubmitSuccessful(!form.submitSuccessful)
                }>
                Add new
              </button>
              <button>
                <Link
                  to='/models'
                  onClick={() =>
                    form.setSubmitSuccessful(!form.submitSuccessful)
                  }
                  style={linkStyle}>
                  Close
                </Link>
              </button>
            </div>
          </>
        )}
        {form.formType === "edit model" && (
          <>
            <h3>Edit successful</h3>
            <div className='success-buttons'>
              <button>
                <Link
                  to='/models'
                  onClick={() =>
                    form.setSubmitSuccessful(!form.submitSuccessful)
                  }
                  style={linkStyle}>
                  Close
                </Link>
              </button>
            </div>
          </>
        )}
        {form.formType === "edit make" && (
          <>
            <h3>Edit successful</h3>
            <div className='success-buttons'>
              <button>
                {" "}
                <Link
                  to='/'
                  onClick={() =>
                    form.setSubmitSuccessful(!form.submitSuccessful)
                  }
                  style={linkStyle}>
                  Close
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(FormSuccess);
