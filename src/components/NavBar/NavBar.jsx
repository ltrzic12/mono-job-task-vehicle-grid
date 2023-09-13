import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/vehicles'>Vehicles</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
