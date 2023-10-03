import vehicleModelService from "./VehicleModelService";
import vehicleStore from "../stores/VehicleStore";
import supabase from "../config/supabaseClient";

class VehicleMakeService {
  async getVehicleMakes() {
    vehicleStore.fetchVehicleMakes();
  }

  async deleteVehicleMake(id) {
    const { data, error } = await supabase
      .from("VehicleMake")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error: ", error);
    }

    if (data) {
      console.log(data, "ID:", id);
      vehicleModelService.deleteVehicleModelsByMakeId(id);
      vehicleStore.fetchVehicleMakes();
    }
  }

  async createMake(name, abrv) {
    if (!name || !abrv) {
      console.error("Please fill in all the fields!");
      return;
    }
    const { data, error } = await supabase
      .from("VehicleMake")
      .insert([{ name, abrv }])
      .select();

    if (error) {
      console.error("Error: ", error);
    }

    if (data) {
      console.log(data);
    }
  }

  async editVehicleMake(name, abrv, id) {
    const { data, error } = await supabase
      .from("VehicleMake")
      .update({ name, abrv })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error: ", error);
    }

    if (data) {
      console.log(data);
    }
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
