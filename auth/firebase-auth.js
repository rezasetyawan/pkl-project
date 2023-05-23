import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const signUpStudent = async (email, password, userData) => {
  try {
    console.log(password)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      role: "student",
    }).then(() => {
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

export const addCompanyAccount = async (email, password) => {
  try {
    // Create the user without automatically signing in
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    
    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: "company",
    });

    // Return the user object
    return user;
  } catch (error) {
    throw new Error(`Failed to sign up: ${error.message}`);
  }
};
