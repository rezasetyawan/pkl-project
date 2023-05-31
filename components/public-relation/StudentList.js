import StudentFilterSection from "./StudentFilterSection";
import StudentItem from "./StudentItem";
import { useState, useMemo } from "react";
import { useDocumentCollections } from "@/lib/firestore";
import Loading from "../Loading";

export default function StudentList() {
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [query, setQuery] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const filterKeywords = {
    class: [],
    major: [],
    classNumber: [],
  };

  const { documentSnapshot, isLoading, error } =
    useDocumentCollections("students");

  useMemo(() => {
    documentSnapshot && setStudentList(documentSnapshot);
  }, [documentSnapshot]);

  useMemo(() => {
    studentList && setFilteredStudents(studentList);
  }, [studentList]);

  const searchedStudents = useMemo(() => {
    return filteredStudents
      ? filteredStudents.filter((studentData) => {
          return (
            studentData.nis.toLowerCase().includes(query.toLowerCase()) ||
            studentData.name.toLowerCase().includes(query.toLowerCase())
          );
        })
      : [];
  }, [filteredStudents, query]);

  const filterCategories = useMemo(
    () => ({
      class: "X,XI,XII,XIII",
      major: "PPLG,DVK,TJKT,PS,LK",
      classNumber: "1,2,3",
    }),
    []
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
          Daftar Murid
        </h2>
        <div className="box-border px-6 md:max-w-[45%] md:flex md:flex-row-reverse md:gap-2">
          <input
            type="text"
            tabIndex={"0"}
            placeholder="Cari nama atau nis"
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
          <StudentItem
            isLoading={isLoading}
            error={error}
            filteredStudents={searchedStudents}
            setIsLoadingDetail={setIsLoadingDetail}
          ></StudentItem>
          {showFilterSection && (
            <StudentFilterSection
              filterKeywords={filterKeywords}
              filterCategories={filterCategories}
              dataList={studentList}
              setDataList={setFilteredStudents}
              setShowFilterSection={setShowFilterSection}
            ></StudentFilterSection>
          )}
        </div>
      </article>
      {isLoadingDetail && <Loading></Loading>}
    </>
  );
}
