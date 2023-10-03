import supabase from "../config/supabaseClient";
import vehicleStore from "../stores/VehicleStore";

class VehicleModelService {
  async createModel(name, abrv, makeId) {
    if (!makeId || !name || !abrv) {
      console.error("Please fill in all the fields!");
      return;
    }
    const { data, error } = await supabase
      .from("VehicleModel")
      .insert([{ name, makeId, abrv }])
      .select();

    if (error) {
      console.error("Error: ", error);
    }

    if (data) {
      console.log(data);
    }
  }

  async deleteVehicleModel(id) {
    const { data, error } = await supabase
      .from("VehicleModel")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error: ", error);
    }

    if (data) {
      console.log(data, "ID:", id);
      vehicleStore.fetchVehicleModels();
    }
  }

  async deleteVehicleModelsByMakeId(makeId) {
    const { data, error } = await supabase
      .from("VehicleModel")
      .delete()
      .eq("makeId", makeId)
      .select();
    if (error) {
      console.error("Error: ", error);
    }
    if (data) {
      console.log(data);
    }
  }

  async editVehicleModel(name, abrv, id) {
    const { data, error } = await supabase
      .from("VehicleModel")
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

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
