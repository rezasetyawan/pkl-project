import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirectCurrentUserToLoginPage } from "@/utils/redirectUser";
import StudentProfile from "@/components/student/Pofile";

export default function ProfilePage() {
  const user = auth.currentUser;
  const router = useRouter();

//   useEffect(() => {
//     redirectCurrentUserToLoginPage(user, router);
//   }, [user, router]);

  return <StudentProfile user={user}></StudentProfile>;
}
