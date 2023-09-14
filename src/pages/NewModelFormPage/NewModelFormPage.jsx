import { observer } from "mobx-react";
import AddModelForm from "../../components/Forms/AddModelForm";

const NewModelFormPage = () => {
  return (
    <>
      <h2>Create new model</h2>
      <AddModelForm></AddModelForm>
    </>
  );
};

export default observer(NewModelFormPage);
