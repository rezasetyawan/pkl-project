import CompanyItem from "./CompanyItem";
import CompanyFilterSection from "./CompanyFilterSection";
import AddButtonIcon from "../public/icon/add-button-icon.svg";
import CompanyDataForm from "./public-relation/CompanyDataForm";
import SuccessModal from "./SuccessModal";
import { useState, useMemo, useContext } from "react";
import { useDocumentCollections } from "@/lib/firestore";
import { UserDataContext } from "@/context/UserContext";
import Loading from "./Loading";

export default function CompanyList() {
  const userData = useContext(UserDataContext);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [query, setQuery] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showCompanyDataForm, setShowCompanyDataForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const filterKeywords = {
    city: [],
    major_target: [],
  };

  const { documentSnapshot, isLoading, error } =
    useDocumentCollections("companies");

  useMemo(() => {
    documentSnapshot && setCompanyList(documentSnapshot);
  }, [documentSnapshot]);

  useMemo(() => {
    companyList && setFilteredCompanies(companyList);
  }, [companyList]);

  const searchedCompanies = useMemo(() => {
    return filteredCompanies
      ? filteredCompanies.filter((companyData) => {
          return companyData.name.toLowerCase().includes(query.toLowerCase());
        })
      : [];
  }, [filteredCompanies, query]);

  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  const filterCategories = useMemo(
    () => ({
      city: removeDuplicates(
        companyList.map((company) => {
          return company.city;
        })
      ).join(","),
      major_target: "PPLG,DKV,TJKT,LK,CG",
    }),
    [companyList]
  );

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
          Referensi Dudi
        </h2>
        <div className="box-border px-6 md:max-w-[45%] md:flex md:flex-row-reverse md:gap-2">
          <input
            type="text"
            tabIndex={"0"}
            placeholder="Search company here"
            onChange={(event) => setQuery(event.target.value)}
            className="bg-[#E9E9E9] w-full h-8 px-2 py-4 rounded-md font-sans font-medium placeholder:text-black/40 placeholder:font-[600] focus:outline-none focus:ring-2"
            onKeyUp={handleEnterKeyUp}
          ></input>
          <button
            className="bg-[#E9E9E9] font-[600] text-black/60 py-1 px-2 font-sans rounded-md my-2 md:my-0 md:min-w-fit hover:ring-2 hover:ring-offset-1"
            onClick={() => setShowFilterSection(!showFilterSection)}
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 inline"
            >
              <path
                d="M1.5 1.75L7.5 8.75742V14.0185L10.5 15.5V8.75742L16.5 1.75H1.5Z"
                stroke="black"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Filter
          </button>
        </div>
        <div className={`px-6 min-h-screen relative pb-6`}>
          <CompanyItem
            isLoading={isLoading}
            error={error}
            filteredCompanies={searchedCompanies}
            setIsLoadingDetail={setIsLoadingDetail}
          ></CompanyItem>
          {showFilterSection && (
            <CompanyFilterSection
              filterKeywords={filterKeywords}
              filterCategories={filterCategories}
              dataList={companyList}
              setDataList={setFilteredCompanies}
              setShowFilterSection={setShowFilterSection}
            ></CompanyFilterSection>
          )}
          {showCompanyDataForm && (
            <CompanyDataForm
              setShowCompanyDataForm={setShowCompanyDataForm}
              setShowSuccessModal={setShowSuccessModal}
            ></CompanyDataForm>
          )}
        </div>
        {userData.role === "public_relation" && (
          <div className="fixed bottom-6 right-6">
            <button
              className="bg-primary-color p-2 rounded-md sm:p-3"
              onClick={() => setShowCompanyDataForm(true)}
            >
              <AddButtonIcon />
            </button>
          </div>
        )}
      </article>
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={"Data berhasil ditambahkan"}
        ></SuccessModal>
      )}
      {isLoadingDetail && <Loading></Loading>}
    </>
  );
}
