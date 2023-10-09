import "./navbar.css";
import NavigationLink from "../Link/Link";
import { navLinkStyle } from "../../utils/mics/styles";
import vehicleModelStore from "../../stores/VehicleModelStore";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const NavBar = () => {
  const handleMakesClick = () => {
    vehicleMakeStore.resetPageIndex();
  };

  const handleModelsClick = () => {
    vehicleMakeStore.resetAllFilters();
    vehicleModelStore.resetPageIndex();
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
            path={"/form/new-model"}
            text={"Add model"}
            style={navLinkStyle}></NavigationLink>
        </li>
        <li>
          <NavigationLink
            path={"/form/new-make"}
            style={navLinkStyle}
            text={"Add make"}></NavigationLink>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
