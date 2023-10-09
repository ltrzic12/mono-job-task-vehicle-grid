import { observer } from "mobx-react";
import { editMakeForm } from "../../stores/form/EditMakeStore";

const EditMake = observer(() => {
  return (
    <form onSubmit={editMakeForm.onSubmit} className='form'>
      <h2>Edit make</h2>
      <label htmlFor={editMakeForm.$("makeName").id}>
        {editMakeForm.$("makeName").label}
      </label>{" "}
      <br />
      <input {...editMakeForm.$("makeName").bind()} />
      <p>{editMakeForm.$("makeName").error}</p>
      <label htmlFor={editMakeForm.$("makeAbbr").id}>
        {editMakeForm.$("makeAbbr").label}
      </label>{" "}
      <br />
      <input {...editMakeForm.$("makeAbbr").bind()} />
      <p>{editMakeForm.$("makeAbbr").error}</p>
      <div className='buttons'>
        {" "}
        <button type='submit'>Submit</button>
        <button type='button' onClick={editMakeForm.onClear}>
          Clear
        </button>
      </div>
      <p>{editMakeForm.error}</p>
    </form>
  );
});

export default EditMake;
