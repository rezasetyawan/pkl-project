import Head from "next/head";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import { useState } from "react";
import { signOutUser } from "@/auth/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();
  const [navBar, setNavbar] = useState(false);

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if (!user) {
  //         router.push('auth/login');
  //       }
  //       router.push('/student')
  //     });
  //     return () => unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const signOutButtonHandler = async () => {
    const user = auth.currentUser;
    signOutUser()
      .then(() => {
        console.log(user.displayName + " sign out successfully");
        router.push("auth/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Head>
        <title>Students</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar navBar={navBar} setNavbar={setNavbar}></Navbar>
      <Layout onClick={() => setNavbar(false)}>
        <button onClick={signOutButtonHandler}>Sign Out</button>
      </Layout>
    </>
  );
}
