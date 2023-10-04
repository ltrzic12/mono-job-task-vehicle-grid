import { observer } from "mobx-react-lite";

const DeleteButton = ({ id, func, func2 }) => {
  const handleDelete = async () => {
    await func(id);
    if (func2) {
      await func2(id);
    }
  };

  return (
    <button onClick={handleDelete}>
      <i className='fa-solid fa-trash'></i>
    </button>
  );
};

export default observer(DeleteButton);
