// VehicleMakeService.js
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import db from "../config/firebaseConfig";

class VehicleMakeService {
  async getVehicleMakes() {
    const vehicleMakesCollection = collection(db, "VehicleMake");
    const querySnapshot = await getDocs(vehicleMakesCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  async deleteVehicleMake(id) {
    try {
      const docRef = doc(db, "VehicleMake", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting", error);
      throw error;
    }
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
