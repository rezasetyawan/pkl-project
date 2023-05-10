import { auth } from "@/lib/firebase";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { redirectCurrentUserToLoginPage } from "@/utils/redirectUser";
import StudentProfile from "@/components/student/Pofile";

export default function ProfilePage() {
  const user = useContext(UserContext);
  const router = useRouter();

//   useEffect(() => {
//     redirectCurrentUserToLoginPage(user, router);
//   }, [user, router]);

  return <StudentProfile user={user}></StudentProfile>;
}
