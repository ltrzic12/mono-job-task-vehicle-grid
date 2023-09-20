import { observer } from "mobx-react";
import VehicleMake from "../../components/VehicleMakeList/VehicleMake";

const MakesPage = () => {
  return (
    <div className='makes-page'>
      <VehicleMake></VehicleMake>
    </div>
  );
};

export default observer(MakesPage);
