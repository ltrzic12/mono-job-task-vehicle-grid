import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const NavigationLink = ({ path, style, text, click }) => {
  return (
    <Link to={path} style={style} onClick={click}>
      {text}
    </Link>
  );
};

export default observer(NavigationLink);
