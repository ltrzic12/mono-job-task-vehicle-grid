import { observer } from "mobx-react";
import AddMakeForm from "../../components/Forms/AddMakeForm";

const NewMakeFormPage = () => {
  return (
    <>
      <h2>Create new make</h2>
      <AddMakeForm></AddMakeForm>
    </>
  );
};

export default observer(NewMakeFormPage);
