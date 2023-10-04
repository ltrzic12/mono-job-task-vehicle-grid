import "./navbar.css";
import form from "../../stores/FormStore";
import NavigationLink from "../Link/Link";
import { navLinkStyle } from "../../utils/mics/styles";
import vehicleStore from "../../stores/VehicleStore";

const NavBar = () => {
  const handleModelFormClick = () => {
    form.setFormType("new model");
    form.resetForm();
  };

  const handleMakeFormClick = () => {
    form.setFormType("new make");
    form.resetForm();
  };

  const handleMakesClick = async () => {
    vehicleStore.changePage("makes");
  };

  const handleModelsClick = async () => {
    vehicleStore.changePage("models");
  };

  return (
    <ul className='navbar'>
      <ul className='navbar-side'>
        <li>
          <NavigationLink
            path={"/"}
            text={"Makes"}
            style={navLinkStyle}
            click={handleMakesClick}></NavigationLink>
        </li>
        <li>
          <NavigationLink
            path={"/models"}
            text={"Models"}
            style={navLinkStyle}
            click={handleModelsClick}></NavigationLink>
        </li>
      </ul>
      <ul className='navbar-side'>
        <li>
          <NavigationLink
            path={"/form"}
            text={"Add model"}
            click={handleModelFormClick}
            style={navLinkStyle}></NavigationLink>
        </li>
        <li>
          <NavigationLink
            path={"/form"}
            click={handleMakeFormClick}
            style={navLinkStyle}
            text={"Add make"}></NavigationLink>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
