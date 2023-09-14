import { observer } from "mobx-react";
import VehicleMakeList from "../../components/VehicleMakeList/VehicleMakeList";

const MakesPage = () => {
  return (
    <>
      <VehicleMakeList></VehicleMakeList>
    </>
  );
};

export default observer(MakesPage);
