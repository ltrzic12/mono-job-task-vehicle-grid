import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const EditButton = ({ path, func, id, style }) => {
  return (
    <button>
      <Link to={path} onClick={() => func(id)} style={style}>
        {" "}
        <i className='fa-solid fa-pen-to-square'></i>
      </Link>
    </button>
  );
};

export default observer(EditButton);
