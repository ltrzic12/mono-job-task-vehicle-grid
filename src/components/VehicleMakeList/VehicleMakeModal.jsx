import { observer } from "mobx-react";
import "./vehicleMakeModal.css";
import { Link } from "react-router-dom";
import vehicleMakeService from "../../services/VehicleMakeService";
import form from "../../stores/FormStore";
import { useState } from "react";
import { linkStyle } from "../../utils/mics/styles";

const VehicleMakeModal = ({ vehicleMake }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };
  const handleEditMakeClick = () => {
    form.setFormType("edit make");
    form.setMakeId(vehicleMake.id);
    form.populateFormData(vehicleMake.name, vehicleMake.abrv, vehicleMake.id);
  };

  return (
    <div className='vehicle-make-item'>
      <h1 className='uppercase'>{vehicleMake.name}</h1>
      {!isOptionsOpened ? (
        <div className='edit' onClick={handleOptionsClick}>
          {" "}
          <i className='fa-solid fa-gear fa-lg'></i>
        </div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <button>
            <Link
              to='/form/edit-make'
              onClick={handleEditMakeClick}
              className='link'
              style={linkStyle}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>
          </button>
          <button
            onClick={() =>
              vehicleMakeService.deleteVehicleMake(vehicleMake.id)
            }>
            <i className='fa-solid fa-trash'></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleMakeModal);
