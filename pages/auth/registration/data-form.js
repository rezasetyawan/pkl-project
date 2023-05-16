import Head from "next/head";
import StudentDataForm from "@/components/student/StudentDataForm";
import JoinPersonLogo from "../../../public/logo/join.svg";
import NextButtonIcon from "../../../public/icon/next-button-icon.svg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext, UserDataContext } from "@/context/UserContext";
import { useDocumentByID } from "@/lib/firestore";

export default function StudentDataInput() {
  const [nextPage, setNextPage] = useState(false);
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();

  const { documentData, isLoading, error } = useDocumentByID(
    "students",
    user ? user.uid : null
  );

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user == null || userData.role !== "student") {
      router.push("/auth/login");
    }

    // if (documentData) {
    //   router.push("/")
    // }
  }, [userData, router, user,documentData]);

  return (
    user && (
      <>
        <Head>
          <title>Register</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {nextPage ? (
          <div>
            <StudentDataForm></StudentDataForm>
          </div>
        ) : (
          <div className="mx-auto py-24 bg-white h-screen sm:max-w-md sm:shadow-md">
            <div className="flex flex-col w-full">
              <h2 className="font-[600] text-3xl leading-7 w-[300px] text-left md:w-[90%] mx-auto font-sans">
                Before proceeding, please complete your personal data
              </h2>
              <div className="mt-12 flex justify-center">
                <JoinPersonLogo />
              </div>
            </div>
            <button
              onClick={() => setNextPage(!nextPage)}
              className="bg-primary-color mt-20 rounded-md text-center  py-4 px-5 float-right mr-10"
            >
              <NextButtonIcon />
            </button>
          </div>
        )}
      </>
    )
  );
}
