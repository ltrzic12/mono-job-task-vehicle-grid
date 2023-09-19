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

  const style = {
    color: "black",
    textDecoration: "none",
  };

  return (
    <ul className='navbar'>
      <ul className='navbar-side'>
        <li>
          <Link to='/' style={style}>
            Makes
          </Link>
        </li>
        <li>
          <Link to='/models' style={style}>
            Models
          </Link>
        </li>
      </ul>
      <ul className='navbar-side'>
        <li>
          <Link to='/form' onClick={handleModelFormClick} style={style}>
            Add model
          </Link>
        </li>
        <li>
          <Link to='/form' onClick={handleMakeFormClick} style={style}>
            Add make
          </Link>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
