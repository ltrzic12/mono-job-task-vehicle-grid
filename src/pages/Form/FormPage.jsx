import { observer } from "mobx-react";
import Form from "../../components/Form/Form";
import { useEffect } from "react";

const FormPage = () => {
  return (
    <div className='form-site'>
      <Form></Form>
    </div>
  );
};

export default observer(FormPage);
