// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDyiFaf-SH6_CmUzO5xlx4C8Ir2By-QDQg",
//   authDomain: "pjbl-pkl.firebaseapp.com",
//   projectId: "pjbl-pkl",
//   storageBucket: "pjbl-pkl.appspot.com",
//   messagingSenderId: "307556052450",
//   appId: "1:307556052450:web:80ebe3a459c573994eddbb",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const setStorageRef = (nis, certificate) => {  
 return ref(
  storage,
  `certificates/${nis}.${certificate.name.split(".").pop()}`
);
}
