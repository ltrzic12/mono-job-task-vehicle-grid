import { observer } from "mobx-react";
import VehicleModelList from "../../components/VehicleModelList/VehicleModelList";

const ModelsPage = () => {
  return (
    <>
      <VehicleModelList></VehicleModelList>
    </>
  );
};

export default observer(ModelsPage);
