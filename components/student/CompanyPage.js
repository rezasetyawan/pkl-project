import { useState, useMemo } from "react";
import CompanyList from "./CompanyList";
import FilterSection from "../FilterSection";
import { useCollectionDocuments } from "@/lib/firestore";
import { useFilterTitlesAndCatagories } from "@/utils/useFilterTitlesAndCategories";

export default function CompanyPage() {
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [query, setQuery] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const filtersKeyword = {
    city: [],
    majorTarget: [],
  };

  const { documentSnapshot, isLoading, error } =
    useCollectionDocuments("companies");

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
      ),
      majorTarget: ["PPLG", "DKV", "TJKT", "LK", "CG"],
    }),
    [companyList]
  );

  const filterTitles = useMemo(
    () => Object.getOwnPropertyNames(filterCategories),
    [filterCategories]
  );

  return (
    <article className="bg-gray-50 pt-5">
      <h2 className="text-2xl font-[600] text-center mb-6">Dunia Industri</h2>
      <div className="box-border px-6 md:max-w-[45%] md:flex md:flex-row-reverse md:gap-1">
        <input
          type="text"
          placeholder="Search company here"
          onChange={(event) => setQuery(event.target.value)}
          className="bg-[#E9E9E9] w-full h-8 px-2 py-4 rounded-md font-medium placeholder:text-black/40 placeholder:font-[600] focus:outline-none"
        ></input>
        <button
          className="bg-[#E9E9E9] font-[600] text-black/60 py-1 px-2 rounded-md my-2 md:my-0 md:min-w-fit"
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
              stroke-opacity="0.6"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          Filter
        </button>
      </div>
      <div className="px-6 min-h-screen relative">
        <CompanyList
          query={query}
          setQuery={setQuery}
          filteredCompanies={searchedCompanies}
        ></CompanyList>
        {showFilterSection && (
          <FilterSection
            filtersKeyword={filtersKeyword}
            filterTitles={filterTitles}
            filterCategories={filterCategories}
            dataList={filteredCompanies}
            setDataList={setFilteredCompanies}
            dataSource={companyList}
            showFilterSection={showFilterSection}
            setShowFilterSection={setShowFilterSection}
          ></FilterSection>
        )}
      </div>
    </article>
  );
}
