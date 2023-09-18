import { observer } from "mobx-react";
import Form from "../../components/Form/Form";
import form from "../../stores/FormStore";

const FormPage = () => {
  return (
    <>
      <Form></Form>
      {form.isLoading && <>Loading...</>}
    </>
  );
};

export default observer(FormPage);
