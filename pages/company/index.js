import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";
import Link from "next/link";
import InputPklMarkForm from "@/components/company/InputPklMark";
import LogOutButtonIcon from "../../public/icon/logout-button-icon.svg";
import ConfirmationModal from "@/components/ConfirmationModal";
import { signOutUser } from "@/auth/firebase-auth";

export default function CompanyHomePage() {
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const [navbar, setNavbar] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || !userData) {
      router.push("/auth/login");
    } else if (userData.role !== "company") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);

  if (!user || !userData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dunia Industri</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/internwolu.ico" />
      </Head>

      <header className="min-h-[50px] bg-white border-b-[1px] px-5 py-2 md:px-10 md:py-3 grid grid-cols-2 justify-end items-center">
        <Link href="/company/" className="">
          <h1 className="font-sans text-primary-color font-bold text-base min-[425px]:text-xl md:text-2xl drop-shadow-md shadow-blue-600/50">
            Intern Wolu
          </h1>
        </Link>
        <button
          className="flex justify-end"
          onClick={() => setShowConfirmationModal(true)}
        >
          <LogOutButtonIcon />
        </button>
      </header>
      <InputPklMarkForm></InputPklMarkForm>
      {showConfirmationModal && <ConfirmationModal actionFunction={signOutUser} setShowConfirmationModal={setShowConfirmationModal} message={"Apakah anda yakin ingin keluar?"}></ConfirmationModal>}
    </>
  );
}
