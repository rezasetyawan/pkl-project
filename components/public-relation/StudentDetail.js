import ConfirmationModal from "../ConfirmationModal";
import SuccessModal from "../SuccessModal";
import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import Link from "next/link";
import DeleteButtonIcon from "../../public/icon/delete-button-icon.svg";
import { useContext, useState } from "react";
import { UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StudentDetail({ studentDetailData }) {
  const router = useRouter();
  const userData = useContext(UserDataContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteStudentData = async () => {
    try {
      await deleteDoc(doc(db, "students", studentDetailData.id));
      setShowDeleteConfirmation(false);
      setShowSuccessModal(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <article className="w-full text-center relative h-screen bg-white pt-10 px-10 rounded-md">
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-3 min-[425px]:left-7 min-[425px]:top-8 text-center p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md"
        >
          <BackButtonIcon />
        </button>

        <div>
          <h2 className="font-bold font-poppins tracking-wide text-lg sm:text-xl relative w-fit mx-auto">
            Student Detail
          </h2>
          <section className="mt-10">
            <div className="flex">
              <h3 className="font-poppins text-lg font-bold text-[#404040] tracking-wide border-b border-[#c0c0c0] w-max mb-6 text-left max-w-full">
                {studentDetailData.name || "-"}
              </h3>
              <p className="ml-2 font-medium text-lg text-[#404040]">{studentDetailData.pklMark}</p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Class
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {`${studentDetailData.class} ${studentDetailData.major} ${studentDetailData.classNumber}` ||
                  "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                NIS
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {studentDetailData.nis || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                PKL Place
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {studentDetailData.pklPlace || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                PKL Address
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase">
                {studentDetailData.pklAddress || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                PKL Date
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {!studentDetailData.pklStartDate &&
                !studentDetailData.pklEndDate ? (
                  "-"
                ) : (
                  <>
                    {" "}
                    <span>
                      {studentDetailData.pklStartDate
                        ? `${studentDetailData.pklStartDate.split("-")[2]}/${
                            studentDetailData.pklStartDate.split("-")[1]
                          }/${studentDetailData.pklStartDate.split("-")[0]}`
                        : "?"}
                    </span>{" "}
                    -{" "}
                    <span>
                      {studentDetailData.pklEndDate
                        ? `${studentDetailData.pklEndDate.split("-")[2]}/${
                            studentDetailData.pklEndDate.split("-")[1]
                          }/${studentDetailData.pklEndDate.split("-")[0]}`
                        : "?"}
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Certificate
              </h4>
              {studentDetailData.certificateUrl ? (
                <Link
                  href={studentDetailData.certificateUrl}
                  className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] text-blue-600 underline hover:scale-105 transition-transform"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  {studentDetailData.nis + ".pdf"}
                </Link>
              ) : (
                <span className="text-black/60">-</span>
              )}
            </div>
          </section>
          {userData.role === "public_relation" && (
            <div className="fixed bottom-10 right-5 flex gap-2">
              <button
                className="bg-primary-color p-2 flex items-center gap-2 rounded-md text-white text-xs font-semibold"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                <DeleteButtonIcon />
                Delete Data
              </button>
            </div>
          )}
        </div>
      </article>
      {showDeleteConfirmation && (
        <ConfirmationModal
          setShowConfirmationModal={setShowDeleteConfirmation}
          actionFunction={deleteStudentData}
          message={`Apakah anda yakin ingin menghapus data ${studentDetailData.name} (${studentDetailData.nis})`}
        ></ConfirmationModal>
      )}

      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={"Data berhasil dihapus"}
        ></SuccessModal>
      )}
    </>
  );
}
