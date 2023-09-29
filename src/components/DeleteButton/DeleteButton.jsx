import { observer } from "mobx-react-lite";

const DeleteButton = ({ id, func }) => {
  return (
    <button onClick={() => func(id)}>
      <i className='fa-solid fa-trash'></i>
    </button>
  );
};

export default observer(DeleteButton);
