import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  return (
    <ul className='navbar'>
      <ul className='navbar-side'>
        <li>
          <Link to='/makes'>Makes</Link>
        </li>
        <li>
          <Link to='/models'>Models</Link>
        </li>
      </ul>
      <ul className='navbar-side'>
        <li>
          <Link to='/add-model'>Add model</Link>
        </li>
        <li>
          <Link to='/add-make'>Add make</Link>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
