import { Link } from "react-router-dom";
import "./navbar.css";
import form from "../../stores/FormStore";

const NavBar = () => {
  const handleModelFormClick = () => {
    form.setFormType("new model");
    form.resetForm();
  };

  const handleMakeFormClick = () => {
    form.setFormType("new make");
    form.resetForm();
  };

  return (
    <ul className='navbar'>
      <ul className='navbar-side'>
        <li>
          <Link to='/'>Makes</Link>
        </li>
        <li>
          <Link to='/models'>Models</Link>
        </li>
      </ul>
      <ul className='navbar-side'>
        <li>
          <Link to='/form' onClick={handleModelFormClick}>
            Add model
          </Link>
        </li>
        <li>
          <Link to='/form' onClick={handleMakeFormClick}>
            Add make
          </Link>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
