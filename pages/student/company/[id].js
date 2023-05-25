import Head from "next/head";
import CompanyDetail from "@/components/CompanyDetail";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDocumentsId } from "@/lib/firestore";
import { useContext, useEffect} from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = await getDocumentsId("companies");
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps({ params }) {
  const companyDetail = await getDoc(doc(db, "companies", params.id));
  const companyDetailData = {
    id: companyDetail.id,
    ...companyDetail.data(),
  };
  return {
    props: {
      companyDetailData,
    },
  };
}

export default function CompanyDetailPage({ companyDetailData }) {
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user == null || userData.role !== "student") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);

  return (
    <>
      <Head>
        <title>Company</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/internwolu.ico" />
      </Head>
      <CompanyDetail companyDetailData={companyDetailData}></CompanyDetail>;
    </>
  )
}
