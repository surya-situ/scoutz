// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA16Z4OFg9aPLlxrycaFwHTfPkgesK6JL0",
  authDomain: "scoutz-d4011.firebaseapp.com",
  projectId: "scoutz-d4011",
  storageBucket: "scoutz-d4011.firebasestorage.app",
  messagingSenderId: "975054861840",
  appId: "1:975054861840:web:8f60e3d7a60b8cb0783c95",
  measurementId: "G-0RWVKKY1XX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);