import { useRouter } from "next/router";
import StudentProfile from "@/components/student/Pofile";

import { useContext, useEffect, useState } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";

export default function ProfilePage() {
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user == null || userData.role !== "student") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);

  return <StudentProfile user={user}></StudentProfile>;
}
