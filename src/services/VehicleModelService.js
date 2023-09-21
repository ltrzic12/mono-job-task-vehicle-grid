import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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

  async deleteVehicleModelsByMakeId(makeId) {
    try {
      const collectionRef = collection(db, "VehicleModel");
      const queryConstraint = query(
        collectionRef,
        where("makeId", "==", makeId),
      );
      const querySnapshot = await getDocs(queryConstraint);
      querySnapshot.forEach(async (modelDoc) => {
        const modelId = modelDoc.id;
        const docRef = doc(db, "VehicleModel", modelId);
        await deleteDoc(docRef);
      });
    } catch (error) {
      console.error("Error deleting models by makeId", error);
      throw error;
    }
  }

  async editVehicleModel(docRef, payload) {
    try {
      await setDoc(docRef, payload);
    } catch (error) {
      console.error(error);
    }
  }
}

const vehicleModelService = new VehicleModelService();
export default vehicleModelService;
