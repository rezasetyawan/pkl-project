import InternEvaluatorItem from "./InternEvaluatorItem";
import AddCompanyForm from "./AddCompanyForm";
import SuccessModal from "../SuccessModal";
import AddButtonIcon from "../../public/icon/add-button-icon.svg";
import { useState, useMemo } from "react";
import { useDocumentCollections } from "@/lib/firestore";

export default function InternEvaluatorList() {
  const [internEvaluatorList, setInternEvaluator] = useState([]);
  const [query, setQuery] = useState("");
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { documentSnapshot, isLoading, error } =
    useDocumentCollections("intern_evaluator");

  useMemo(() => {
    documentSnapshot && setInternEvaluator(documentSnapshot);
  }, [documentSnapshot]);

  const filteredInternEvaluator = useMemo(() => {
    return internEvaluatorList
      ? internEvaluatorList.filter((studentData) => {
          return studentData.name.toLowerCase().includes(query.toLowerCase());
        })
      : [];
  }, [internEvaluatorList, query]);

  const handleEnterKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <>
      <article className="bg-slate-50 pt-5">
        <h2 className="text-2xl font-[600] text-center mb-6 font-sans">
          Daftar Dudi
        </h2>
        <div className="box-border px-6 md:max-w-[45%] md:flex md:flex-row-reverse md:gap-2">
          <input
            type="text"
            tabIndex={"0"}
            placeholder="Cari nama dudi"
            onChange={(event) => setQuery(event.target.value)}
            className="bg-[#E9E9E9] w-full h-8 px-2 py-4 rounded-md font-sans font-medium placeholder:text-black/40 placeholder:font-[600] focus:outline-none focus:ring-2"
            onKeyUp={handleEnterKeyUp}
          ></input>
        </div>
        <div className={`px-6 min-h-screen relative pb-6`}>
          <InternEvaluatorItem
            isLoading={isLoading}
            error={error}
            filteredInternEvaluator={filteredInternEvaluator}
          ></InternEvaluatorItem>
        </div>
        <div className="fixed bottom-6 right-6">
          <button
            className="bg-primary-color p-2 rounded-md sm:p-3"
            onClick={() => setShowAddCompanyForm(true)}
          >
            <AddButtonIcon />
          </button>
        </div>
      </article>
      {showAddCompanyForm && (
        <AddCompanyForm
          setShowAddCompanyForm={setShowAddCompanyForm}
          setShowSuccessModal={setShowSuccessModal}
        ></AddCompanyForm>
      )}
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={"Dudi berhasil ditambahkan"}
        ></SuccessModal>
      )}
    </>
  );
}
