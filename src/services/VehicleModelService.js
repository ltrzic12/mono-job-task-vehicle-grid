import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import db from "../config/firebaseConfig";
class VehicleModelService {
  async createModel(makeId, name, abrv) {
    if (!makeId || !name || !abrv) {
      console.error("Please fill in all the fields!");
      return;
    }
    try {
      const modelData = {
        makeId,
        name,
        abrv,
      };
      const modelRef = await addDoc(collection(db, "VehicleModel"), modelData);
      return modelRef.id;
    } catch (error) {
      console.error("Error creating model:", error);
      throw error;
    }
  }
  async deleteVehicleModel(id) {
    try {
      const docRef = doc(db, "VehicleModel", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting", error);
      throw error;
    }
  }
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
