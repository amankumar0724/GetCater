
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm_uBkhniYYWA3P-AZMrydItc6Aw8AAXE",
  authDomain: "ecommer-3a799.firebaseapp.com",
  projectId: "ecommer-3a799",
  storageBucket: "ecommer-3a799.appspot.com",
  messagingSenderId: "239245312753",
  appId: "1:239245312753:web:20ee7091ff9ebbaafa1f50",
  measurementId: "G-VZB0G5G4C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const fireDB = getFirestore(app);

export { auth, googleProvider, fireDB };
