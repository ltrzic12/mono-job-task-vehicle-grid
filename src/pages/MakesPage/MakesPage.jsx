import { observer } from "mobx-react";
import VehicleMakeList from "../../components/VehicleMakeList/VehicleMakeList";

const MakesPage = () => {
  return (
    <div className='makes-page'>
      <VehicleMakeList></VehicleMakeList>
    </div>
  );
};

export default observer(MakesPage);
