import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const EditButton = ({ path, func, ID, makeID, style }) => {
  return (
    <button>
      <Link to={path} onClick={() => func(ID, makeID)} style={style}>
        <i className='fa-solid fa-pen-to-square'></i>
      </Link>
    </button>
  );
};

export default observer(EditButton);
