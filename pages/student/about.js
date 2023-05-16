import About from "@/components/About";
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";

export default function AboutPage() {
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
  return <About></About>;
}
