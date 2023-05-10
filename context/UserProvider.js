import { useState, useEffect, useContext } from "react";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "@/components/Loading";
import { UserContext } from "./UserContext";
import { useRouter } from "next/router";

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/auth/login");
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
