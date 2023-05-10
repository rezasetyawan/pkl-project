import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const signUpStudent = async (email, nis, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {...userData, role: 'student'}).then(() => {
      console.log("welcome");
    });
    return user;
  } catch (error) {
    throw new Error(`Failed to sign up : ${error.message}`);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Failed to sign out: ${error.message}`);
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(`Failed to sign in: ${error.message}`);
  }
};
