import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSS-wg_WH3OsVFCmlCoglPBndhY2qGmU4",
  authDomain: "mono-project-99b95.firebaseapp.com",
  projectId: "mono-project-99b95",
  storageBucket: "mono-project-99b95.appspot.com",
  messagingSenderId: "326575618033",
  appId: "1:326575618033:web:030b8a4e7758d3cdee3650",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
