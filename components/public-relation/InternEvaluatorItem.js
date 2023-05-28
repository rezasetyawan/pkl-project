import Loading from "../Loading";
import Error from "../Error";
import DeleteButtonIcon from "../../public/icon/delete-button-icon.svg";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SuccessModal from "../SuccessModal";

export default function InternEvaluatorItem({
  isLoading,
  error,
  filteredInternEvaluator,
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [internEvaluatorId, setInternEvaluatorId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error} />;
  if (filteredInternEvaluator.length < 1)
    return <Error errorMessage={"Dudi tidak ditemukan"} errorCode={"404"} />;

  const deleteInternEvaluator = async (docId) => {
    try {
      await deleteDoc(doc(db, "intern_evaluator", docId));
      setShowDeleteConfirmation(false);
      setShowSuccessModal(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="grid grid-cols-3 my-5 px-3">
          <p>Nama Dudi</p>
          <p>Peserta PKL</p>
          <p>Token</p>
        </div>
        {filteredInternEvaluator.map((internEvaluator, index) => (
          <div
            className="bg-white p-2 my-1 rounded-md shadow-md relative"
            key={index}
          >
            <div className="grid grid-cols-3">
              <h3 className="font-semibold text-left max-w-[90%] whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-base">
                {internEvaluator.name || "-"}
              </h3>
              <div className="flex my-1">
                <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs sm:text-sm">
                  {internEvaluator
                    ? internEvaluator.pklParticipant.join(", ")
                    : "-"}
                </p>
              </div>
              <div className="flex my-1">
                <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs sm:text-sm">
                  {internEvaluator.token || "-"}
                </p>
              </div>
            </div>
            <button
              className="absolute right-1 top-3 rounded-sm bg-primary-color px-2 py-1"
              onClick={() => {
                setInternEvaluatorId(internEvaluator.id);
                setShowDeleteConfirmation(true);
              }}
            >
              <DeleteButtonIcon />
            </button>
          </div>
        ))}
      </div>
      {showDeleteConfirmation && (
        <ConfirmationModal
          actionFunction={()=>deleteInternEvaluator(internEvaluatorId)}
          setShowConfirmationModal={setShowDeleteConfirmation}
          message={`Apakah anda yakin ingin menghapus data ${internEvaluatorId}? `}
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
