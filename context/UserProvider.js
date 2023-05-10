import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/lib/firebase";
import {getDoc, doc } from "firebase/firestore";
import Loading from "@/components/Loading";
import { UserContext, UserDataContext } from "./UserContext";
import { onAuthStateChanged } from "firebase/auth";

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        const docSnapshot = await getDoc(doc(db, "users", user.displayName || user.uid));
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        }
        setIsUserDataLoading(false);
      } else {
        setIsUserDataLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (isLoading || isUserDataLoading) {
    return <Loading />;
  }

  if (!user) {
    router.push("/auth/login");
  }

  return (
    <UserContext.Provider value={user}>
      <UserDataContext.Provider value={userData}>
        {children}
      </UserDataContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
