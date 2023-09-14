// VehicleMakeService.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
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
  async addVehicleMake() {
    let name = prompt("Enter name");
    let abrv = prompt("Enter abrv");
    try {
      const collectionRef = collection(db, "VehicleMake");
      const payload = { name, abrv };
      addDoc(collectionRef, payload);
    } catch (error) {
      console.error(error);
    }
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
