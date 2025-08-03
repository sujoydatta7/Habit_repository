// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANeIgIEmdMiZZpvF_jbeY4Max-P3UNCLo",
  authDomain: "habit-tracker-6a12b.firebaseapp.com",
  projectId: "habit-tracker-6a12b",
  storageBucket: "habit-tracker-6a12b.firebasestorage.app",
  messagingSenderId: "1048562463438",
  appId: "1:1048562463438:web:19fc58b04eb2fed6c6d69f",
  measurementId: "G-2XGWW2HP0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
