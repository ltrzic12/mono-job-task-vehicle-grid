import { observer } from "mobx-react";
import { editModelForm } from "../../stores/form/EditModelStore";

const EditModel = observer(() => {
  return (
    <form onSubmit={editModelForm.onSubmit} className='form'>
      <h2>Edit model</h2>
      <label htmlFor={editModelForm.$("modelName").id}>
        {editModelForm.$("modelName").label}
      </label>{" "}
      <br />
      <input {...editModelForm.$("modelName").bind()} />
      <p>{editModelForm.$("modelName").error}</p>
      <label htmlFor={editModelForm.$("newAbbreviation").id}>
        {editModelForm.$("newAbbreviation").label}
      </label>{" "}
      <br />
      <input {...editModelForm.$("newAbbreviation").bind()} />
      <p>{editModelForm.$("newAbbreviation").error}</p>
      <div className='buttons'>
        {" "}
        <button type='submit'>Submit</button>
        <button type='button' onClick={editModelForm.onClear}>
          Clear
        </button>
      </div>
      <p>{editModelForm.error}</p>
    </form>
  );
});

export default EditModel;
