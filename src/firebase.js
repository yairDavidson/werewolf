import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
  apiKey: "AIzaSyAE1dCOpq-60AOvsiA0Jjwp2fQzR6pT6Ho",
  authDomain: "button-switch.firebaseapp.com",
  databaseURL: "https://button-switch-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "button-switch",
  storageBucket: "button-switch.firebasestorage.app",
  messagingSenderId: "539954061254",
  appId: "1:539954061254:web:fcffa655892c9094cfdcc7",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
