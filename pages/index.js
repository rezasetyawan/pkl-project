import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserDataContext } from "@/context/UserContext";
import Head from "next/head";

export default function Home() {
  const userData = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
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
  }, [userData, router]);

  return (
    <>
      <Head>
        <title>Intern Wolu</title>
        <meta name="description" content="Intern Wolu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
