import Head from "next/head";
import StudentDataInputForm from "@/components/student/StudentDataInput";
import JoinPersonLogo from "../../../public/logo/join.svg";
import NextButtonIcon from "../../../public/icon/next-button-icon.svg";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import { redirectCurrentUserToLoginPage } from "@/utils/redirectUser";

export default function SignInPage() {
  const user = auth.currentUser;
  const router = useRouter();
  const [nextPage, setNextPage] = useState(false);

  redirectCurrentUserToLoginPage(user, router)
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
            <StudentDataInputForm></StudentDataInputForm>
          </div>
        ) : (
          <div className="mx-auto my-24 md:w-[400px]">
            <div className="flex flex-col w-full">
              <h2 className="font-[600] text-3xl leading-7 w-[300px] text-left md:w-[90%] mx-auto">
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
