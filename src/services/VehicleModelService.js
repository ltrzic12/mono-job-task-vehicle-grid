import { addDoc, collection } from "firebase/firestore";
import db from "../config/firebaseConfig";
class VehicleModelService {
  async createModel(makeId, name, abrv) {
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
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
