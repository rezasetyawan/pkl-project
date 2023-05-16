import StudentDetail from "@/components/public-relation/StudentDetail";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDocumentsId } from "@/lib/firestore";
import { useContext, useEffect } from "react";
import { UserContext, UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = await getDocumentsId("students");
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const studentDetail = await getDoc(doc(db, "students", params.id));
  const studentDetailData = {
    id: studentDetail.id,
    ...studentDetail.data(),
  };
  console.log(studentDetailData);
  return {
    props: {
      studentDetailData,
    },
  };
}

export default function StudentDetailPage({ studentDetailData }) {
  const user = useContext(UserContext);
  const userData = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    if (user == null || userData.role !== "public_relation") {
      router.push("/auth/login");
    }
  }, [userData, router, user]);
  console.log(studentDetailData);

  return <StudentDetail studentDetailData={studentDetailData}></StudentDetail>;
}
