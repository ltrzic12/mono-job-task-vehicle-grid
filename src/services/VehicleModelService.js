import supabase from "../config/supabaseClient";
import vehicleModelStore from "../stores/VehicleModelStore";

class VehicleModelService {
  fetchVehicleModels = async () => {
    vehicleModelStore.setLoading(true);
    let query = supabase
      .from("VehicleModel")
      .select()
      .order(vehicleModelStore.selectedSort, {
        ascending: vehicleModelStore.ascending,
      })
      .range(vehicleModelStore.startAt, vehicleModelStore.endAt);

    if (vehicleModelStore.selectedMakeID !== "") {
      query = query.eq("makeId", vehicleModelStore.selectedMakeID);
    }

    const { data, error } = await query;

    if (error) {
      vehicleModelStore.setFetchError("Error");
      vehicleModelStore.replaceModels(null);
      console.log(error);
      vehicleModelStore.setLoading(false);
    }
    if (data) {
      vehicleModelStore.replaceModels(data);
      await this.calculateNumberOfData("VehicleModel");
      console.log(
        "Ukupno modela u bazi: ",
        vehicleModelStore.totalNumberOfData,
        "Ukupno stranica: ",
        vehicleModelStore.numberOfPages,
        "Povučeni modeli: ",
        vehicleModelStore.vehicleModels,
      );
      vehicleModelStore.setFetchError(null);
      vehicleModelStore.setLoading(false);
    }
  };

  async calculateNumberOfData() {
    try {
      const { data, error } = await supabase.from("VehicleModel").select("id");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        vehicleModelStore.setTotalNumberOfData(data.length);
        vehicleModelStore.numberOfPages = Math.ceil(
          data.length / (vehicleModelStore.endAt + 1),
        );
      }
    } catch (error) {
      console.error("Error calculating total number of items:", error);
    }
  }

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

  deleteVehicleModel = async (id) => {
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
      await this.fetchVehicleModels();
    }
  };

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

  fetchNextPage = async () => {
    vehicleModelStore.incrementPageIndex();
    await this.fetchVehicleModels();
  };

  fetchPreviousPage = async () => {
    vehicleModelStore.decrementPageIndex();
    await this.fetchVehicleModels();
  };
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
