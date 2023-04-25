import Head from "next/head";
import Navbar from "@/components/student/Navbar";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import { redirectCurrentUserToLoginPage } from "@/utils/redirectUser";
import { signOutUser } from "@/auth/firebase-auth";
import CompanyPage from "@/components/student/CompanyPage";

export default function Student() {
  const user = auth.currentUser;
  console.log(user)
  const router = useRouter();
  const [navBar, setNavbar] = useState(false);

  useEffect(()=> {
    redirectCurrentUserToLoginPage(user, router)
  },[user, router])

  const signOutButtonHandler = async () => {
    signOutUser()
      .then(() => {
        console.log(user.displayName + " sign out successfully");
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    user && (
      <>
        <Head>
          <title>Student</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar navBar={navBar} setNavbar={setNavbar}></Navbar>
        <CompanyPage></CompanyPage>
        <button onClick={signOutButtonHandler}>Sign Out</button>
      </>
    )
  );
}
