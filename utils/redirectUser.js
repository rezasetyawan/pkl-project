import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const gettingUserRole = async (nis) => {
  const docRef = doc(db, "users", nis);
  await getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const userRole = doc.data().role;
        return userRole
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export const redirectCurrentUserToLoginPage = (user, router) => {
  if (typeof window !== "undefined") {
    !user && router.push("/auth/login");
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return user;
};
