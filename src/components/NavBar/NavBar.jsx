import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/makes'>Makes</Link>
        </li>
        <li>
          <Link to='/models'>Models</Link>
        </li>
        <li>
          <Link to='/addmodel'>Add new model</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
