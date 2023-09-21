import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import db from "../config/firebaseConfig";
import vehicleModelService from "./VehicleModelService";

class VehicleMakeService {
  async getVehicleMakes() {
    const vehicleMakesCollection = collection(db, "VehicleMake");
    const querySnapshot = await getDocs(vehicleMakesCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  async deleteVehicleMake(id) {
    try {
      // Delete the associated VehicleModels first
      await vehicleModelService.deleteVehicleModelsByMakeId(id);

      // Then delete the VehicleMake
      const docRef = doc(db, "VehicleMake", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting", error);
      throw error;
    }
  }

  async createMake(name, abrv) {
    if (!name || !abrv) {
      console.error("Please fill in all the fields!");
      return;
    }
    try {
      const modelData = {
        name,
        abrv,
      };
      const makeRef = await addDoc(collection(db, "VehicleMake"), modelData);
      return makeRef.id;
    } catch (error) {
      console.error("Error creating make:", error);
      throw error;
    }
  }
  async editVehicleMake(docRef, payload) {
    try {
      await setDoc(docRef, payload);
    } catch (error) {
      console.error(error);
    }
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
