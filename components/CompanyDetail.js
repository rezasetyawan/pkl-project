import CompanyDataForm from "./public-relation/CompanyDataForm";
import BackButtonIcon from "../public/icon/back-button-icon.svg";
import EditButtonIcon from "../public/icon/edit-button-icon-white.svg";
import DeleteButtonIcon from "../public/icon/delete-button-icon.svg";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserDataContext } from "@/context/UserContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CompanyDetail({ companyDetailData }) {
  const router = useRouter();
  const userData = useContext(UserDataContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successModalMessage,setSuccessModalMessage] = useState("")

  const deleteCompanyData = async () => {
    try {
      await deleteDoc(doc(db, "companies", companyDetailData.id));
      setShowDeleteConfirmation(false);
      setSuccessModalMessage("Data berhasil dihapus")
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
            Company Detail
          </h2>
          <section className="mt-10">
            <h3 className="font-poppins text-lg font-bold text-[#404040] tracking-wide border-b border-[#c0c0c0] w-max mb-6 text-left max-w-full">
              {companyDetailData.name || "-"}
              <sup
                className={`font-bold text-[10px] leading-4 ml-1 text-[#0066ff] ${
                  !companyDetailData.isMOU && "hidden"
                }`}
              >
                MOU
              </sup>
            </h3>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                City
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {companyDetailData.city || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Address
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {companyDetailData.address || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Field
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {companyDetailData.field || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Major target
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase">
                {companyDetailData.major_target.join(", ") || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Phone
              </h4>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%]">
                {companyDetailData.phone || "-"}
              </p>
            </div>
            <div className="flex my-3">
              <h4 className="font-sans text-[#3e3c3c] text-left font-semibold text-sm min-w-[140px]">
                Website
              </h4>
              {companyDetailData.website ? (
                <Link
                  href={`https://${companyDetailData.website}`}
                  className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] text-blue-600 underline hover:scale-105 transition-transform"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  {companyDetailData.website}
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
                onClick={() => setIsEditing(true)}
              >
                <EditButtonIcon />
                Edit Data
              </button>
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
      {isEditing && (
        <CompanyDataForm
          companyData={companyDetailData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessModalMessage={setSuccessModalMessage}
        ></CompanyDataForm>
      )}
      {showDeleteConfirmation && (
        <ConfirmationModal
          setShowConfirmationModal={setShowDeleteConfirmation}
          actionFunction={deleteCompanyData}
          message={`Apakah anda yakin ingin menghapus data ${companyDetailData.name}`}
        ></ConfirmationModal>
      )}
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={successModalMessage}
        ></SuccessModal>
      )}
    </>
  );
}
