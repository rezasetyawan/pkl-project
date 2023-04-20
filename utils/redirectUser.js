import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

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