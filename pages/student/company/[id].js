import { useCollectionsID } from "@/lib/firestore";
import CompanyDetail from "@/components/student/CompanyDetail";
import Layout from "@/components/Layout";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import BackButtonIcon from "../../../public/icon/back-button-icon.svg";
import { getDocumentsId } from "@/lib/firestore";

export async function getStaticPaths() {
  const paths = await getDocumentsId("companies");
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const companyDetail = await getDoc(doc(db, "companies", params.id));
  const companyDetailData = companyDetail.data();
  return {
    props: {
      companyDetailData,
    },
  };
}

export default function CompanyDetailPage({ companyDetailData }) {
  console.log(companyDetailData);
  return <CompanyDetail companyDetailData={companyDetailData}></CompanyDetail>;
}
