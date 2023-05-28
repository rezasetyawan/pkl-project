import Head from "next/head";
import NavbarPR from "@/components/public-relation/Navbar";
import SideBarPR from "@/components/public-relation/Sidebar";
import ConfirmationModal from "@/components/ConfirmationModal";
import PublicRelationHome from "@/components/public-relation/Home";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";
import { signOutUser } from "@/auth/firebase-auth";

export default function PublicRelationHomePage() {
  const [sidebar, setSidebar] = useState(false);
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();
  const [showLogOutConfirmation, setShowLogOutConfirmation] = useState(false);

  useEffect(() => {
    if (!user || !userData) {
      router.push("/auth/login");
    } else if (userData.role !== "public_relation") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);

  if (!user || !userData) {
    return null;
  }
  
  return (
    <>
      <Head>
        <title>Public Relation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/internwolu.ico" />
      </Head>
      <NavbarPR sidebar={sidebar} setSidebar={setSidebar}></NavbarPR>
      <SideBarPR
        sidebar={sidebar}
        setShowLogOutConfirmation={setShowLogOutConfirmation}
      ></SideBarPR>
      <div class={`lg:ml-64`}>
        <div class="rounded-lg mt-14 bg-white h-screen">
          <PublicRelationHome></PublicRelationHome>
          {showLogOutConfirmation && (
            <ConfirmationModal
              actionFunction={signOutUser}
              setShowConfirmationModal={setShowLogOutConfirmation}
              message={"Apakah anda yakin ingin keluar?"}
            ></ConfirmationModal>
          )}
        </div>
      </div>
    </>
  );
}
