import Head from "next/head";
import NavbarPR from "@/components/public-relation/Navbar";
import StudentList from "@/components/public-relation/StudentList";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";
import { signOutUser } from "@/auth/firebase-auth";

export default function PublicRelationStudentsPage() {
  const [navbar, setNavbar] = useState(false);
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();
  console.log(userData);
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user == null || userData.role !== "public_relation") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);

  return (
    <>
      <Head>
        <title>Companies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarPR navBar={navbar} setNavbar={setNavbar}></NavbarPR>
      <StudentList>
        <button onClick={signOutUser}>Sign Out</button>
      </StudentList>
    </>
  );
}