import { observer } from "mobx-react";
import "./vehicleMake.css";
import { Link } from "react-router-dom";
import vehicleMakeService from "../../services/VehicleMakeService";
import form from "../../stores/FormStore";
import { useState } from "react";

const VehicleMake = ({ vehicleMake }) => {
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
      <h1>{vehicleMake.name}</h1>
      {!isOptionsOpened ? (
        <div className='edit' onClick={handleOptionsClick}></div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <button
            onClick={() =>
              vehicleMakeService.deleteVehicleMake(vehicleMake.id)
            }>
            Delete make
          </button>
          <Link to='/form/edit-make' onClick={handleEditMakeClick}>
            Edit make
          </Link>
          <button onClick={handleOptionsClick}>Close</button>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleMake);
