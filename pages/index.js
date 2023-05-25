import Head from "next/head";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext, UserDataContext } from "@/context/UserContext";

export default function Home() {
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (userData) {
      switch (userData.role) {
        case "student":
          router.push("/student/");
          break;
        case "public_relation":
          router.push("/public-relation/");
          break;
        case "company":
          router.push("/company/"); 
          break;
        default:
          router.push("/");
      }
    }
  }, [userData, router, user]);

  return (
    <>
      <Head>
        <title>Intern Wolu</title>
        <meta name="description" content="Intern Wolu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/internwolu.ico" />
      </Head>
    </>
  );
}
