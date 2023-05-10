import Head from "next/head";
import Navbar from "@/components/student/Navbar";
import CompanyPage from "@/components/student/CompanyPage";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";

export default function StudentHomePage() {
  const user = useContext(UserContext)
  const userData = useContext(UserDataContext);
  const [navBar, setNavbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user == null || userData.role !== "student" ) {
      router.push("/auth/login")
    }
  }, [userData, router,user]);

  return (
    <>
      <Head>
        <title>Student</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar navBar={navBar} setNavbar={setNavbar}></Navbar>
      <CompanyPage onClick={() => setNavbar(false)}></CompanyPage>
    </>
  );
}
