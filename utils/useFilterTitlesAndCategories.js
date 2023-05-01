import { useMemo } from "react";
export function useFilterTitlesAndCatagories(companyList) {
    console.log(companyList)
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

  const filterTitle = useMemo(
    () => Object.getOwnPropertyNames(filterCategories),
    [filterCategories]
  );

  return {
    filterCategories: filterCategories,
    filterTitles: filterTitle,
  };
}
