import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import useSWR from "swr";

export default function Home() {
  const user = useContext(UserContext);
  console.log("user");
  console.log(user);
  const router = useRouter();

  const fetcher = async (docId) => {
    const docSnapshot = await getDoc(doc(db, "users", docId));
    const userData = docSnapshot.data();
    return { ...userData };
  };

  const { data, error } = useSWR(
    user ? user.displayName || user.uid : null,
    fetcher,
    {
      suspense: true,
      shouldRetryOnError: (error) => {
        if (user) {
          return true;
        }
        return false;
      },
    }
  );

  if (!user) {
    return null;
  }

  if (typeof window !== "undefined") {
    console.log("data");
    console.log(data);
    switch (data.role) {
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
    return null;
  }

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
