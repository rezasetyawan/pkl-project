// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// require("dotenv").config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyiFaf-SH6_CmUzO5xlx4C8Ir2By-QDQg",
  authDomain: "pjbl-pkl.firebaseapp.com",
  projectId: "pjbl-pkl",
  storageBucket: "pjbl-pkl.appspot.com",
  messagingSenderId: "307556052450",
  appId: "1:307556052450:web:80ebe3a459c573994eddbb",
};

// const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: "pjbl-pkl.firebaseapp.com",
//   projectId: "pjbl-pkl",
//   storageBucket: "pjbl-pkl.appspot.com",
//   messagingSenderId: "307556052450",
//   appId: "1:307556052450:web:80ebe3a459c573994eddbb",
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
