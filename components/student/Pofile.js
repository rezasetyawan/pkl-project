import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import UserIcon from "../../public/icon/user-icon.svg";
import LogOutButtonIcon from "../../public/icon/logout-button-icon.svg";
import EditButtonIcon from "../../public/icon/edit-button-icon.svg";
import Loading from "../Loading";
import StudentDataForm from "./StudentDataForm";
import ConfirmationModal from "../ConfirmationModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDocumentByID } from "@/lib/firestore";
import { useMemo, useState } from "react";
import { signOutUser } from "@/auth/firebase-auth";

export default function StudentProfile({ user }) {
  const [studentData, setStudentData] = useState({});
  const [showEditSection, setShowEditSection] = useState(false);
  const [editCertificate, setEditCertificate] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const router = useRouter();
  const { documentData, isLoading, error } = useDocumentByID(
    "students",
    user ? user.uid : null
  );

  useMemo(() => {
    documentData && setStudentData(documentData);
  }, [documentData]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const manageButtonHandler = () => {
    setShowEditSection(true);
  };

  return showEditSection ? (
    <StudentDataForm
      studentData={studentData}
      isEditing={showEditSection}
      setIsEditing={setShowEditSection}
      editCertificate={editCertificate}
      setEditCertificate={setEditCertificate}
    >
      <button
        className="absolute top-3 left-3 min-[425px]:left-2 min-[425px]:top-6 p-3 hover:scale-110 transition-transform"
        onClick={() => {
          setShowEditSection(false)
          setEditCertificate(false)
        }}
      >
        <BackButtonIcon />
      </button>
    </StudentDataForm>
  ) : (
    <>
      <article className="w-full min-h-full pb-6 bg-white mx-auto sm:max-w-md sm:shadow-md">
        <div className="flex items-center justify-center gap-20 pt-4 min-[375px]:gap-28 min-[425px]:gap-32">
          <button
            className="p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md"
            onClick={() => router.back()}
          >
            <BackButtonIcon />
          </button>
          <h2 className="font-sans text-2xl font-semibold">Profile</h2>
          <button
            className="px-3 py-2 hover:scale-110 transition-transform hover:ring-2 rounded-md"
            onClick={() => setShowConfirmationModal(true)}
          >
            <LogOutButtonIcon />
          </button>
        </div>
        <section className="text-center w-full font-medium ">
          <div className="overflow-hidden rounded-[50%] w-24 h-24 mx-auto border flex justify-center p-1 mt-8">
            <UserIcon />
          </div>
          <h3 className="font-sans text-xl mt-3">{studentData.name || "-"}</h3>
          <h4 className="font-sans text-black/60 text-sm">
            {studentData.class}/{studentData.major} {studentData.classNumber}
          </h4>
          <h4 className="font-sans text-black/60 text-sm">
            {studentData.nis || "-"}
          </h4>
          <button
            className="flex mt-2 gap-1 items-center mx-auto font-sans text-[#5e5e5e] p-1 border border-[#717171] rounded-md hover:"
            onClick={manageButtonHandler}
          >
            Manage <EditButtonIcon />
          </button>
        </section>
        <section className="mx-10 my-6 px-5 py-4 border border-[#717171] rounded-md">
          <h4 className="font-sans font-sm font-medium text-center">
            Intern Detail
          </h4>
          <div className="text-sm font-normal">
            <div className="my-3">
              <h5 className="font-sans font-medium">PKL Place</h5>
              <p className="border-black/40 border-b-[1px] font-sans">
                {studentData.pklPlace || "-"}
              </p>
            </div>

            <div className="my-3">
              <h5 className="font-sans font-medium">PKL Address</h5>
              <p className="border-black/40 border-b-[1px] font-sans">
                {studentData.pklAddress || "-"}
              </p>
            </div>

            <div className="mt-3">
              <h5 className="font-sans font-medium">PKL Date</h5>
              <div className="flex gap-5 font-normal text-center">
                <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                  {studentData.pklStartDate || "-"}
                </p>
                -
                <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                  {studentData.pklEndDate || "-"}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-10 my-6 py-4 text-sm">
          <h5 className="font-sans font-medium">Certificate</h5>
          <div className="bg-[#D9D9D9] w-full h-44 rounded-md flex items-center justify-center mt-2 relative">
            <button
              className="mt-2 gap-1 items-center mx-auto font-sans text-[#5e5e5e] p-1 rounded-md absolute top-0 right-2"
              onClick={()=>{
                manageButtonHandler()
                setEditCertificate(true)
              }}
            >
              <EditButtonIcon />
            </button>
            {studentData.certificateUrl ? (
              <Link
                href={studentData.certificateUrl}
                className="font-sans font-semibold p-4"
              >
                {studentData.nis}.pdf
              </Link>
            ) : (
              <p className="font-sans font-semibold p-4">
                You do not upload the certificate yet
              </p>
            )}
          </div>
        </div>
      </article>
      {showConfirmationModal && (
        <ConfirmationModal
          setShowConfirmationModal={setShowConfirmationModal}
          actionFunction={signOutUser}
          message={"Are you sure you want to sign out?"}
        ></ConfirmationModal>
      )}
    </>
  );
}
