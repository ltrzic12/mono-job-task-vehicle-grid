// VehicleMakeService.js
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase_setup/firebaseConfig";

class VehicleMakeService {
  async getVehicleMakes() {
    const vehicleMakesCollection = collection(db, "VehicleMake");
    const querySnapshot = await getDocs(vehicleMakesCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}

const vehicleMakeService = new VehicleMakeService();
export default vehicleMakeService;
