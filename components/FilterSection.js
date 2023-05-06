import { useState } from "react";
export default function FilteredSection({
  filtersKeyword,
  dataList,
  setDataList,
  filterTitles,
  filterCategories,
  dataSource,
  setShowFilterSection,
}) {
  const [filters, setFilters] = useState(filtersKeyword);

  const handleFilterChange = (title, category) => {
    console.log("prev filters");
    console.log(filters);
    const newFilters = { ...filters };
    if (newFilters[title].includes(category)) {
      newFilters[title] = newFilters[title].filter(
        (filterCategory) => filterCategory !== category
      );
    } else {
      newFilters[title].push(category);
    }
    setFilters(newFilters);
    console.log("setting filters");
    console.log(filters);
  };

  const resetFilterButtonHandler = () => {
    setFilters({ ...filtersKeyword });
    console.log("reset filters");
    console.log(filters);
  };

  const filterButtonHandler = () => {
    if (filters.city.length == 0 && filters.majorTarget.length == 0) {
      console.log("data source");
      console.log(dataSource);
      setDataList(dataSource);
      return;
    }
    const filteredList = dataList.filter((item) => {
      if (
        filters.city.length > 0 &&
        !filters.city.includes(item.city.toString())
      ) {
        return false;
      }
      if (
        filters.majorTarget.length > 0 &&
        !filters.majorTarget.includes(item.major_target.toString())
      ) {
        return false;
      }
      return true;
    });
    setDataList(filteredList);
    console.log("filters");
    console.log(filters);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] w-full overflow-hidden h-screen p-5 bg-black/80 md:p-10">
        <div className="relative w-full top-[15%] flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-2 border-b rounded-t md:p-4">
              <span className=" text-lg font-semibold text-gray-900 block md:text-xl font-sans">
                Filter
              </span>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => setShowFilterSection(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="max-h-[200px] min-[375px]:min-h-[340px] min-[375px]:max-h-[340px] overflow-y-scroll overflow-x-hidden">
              {filterTitles.map((title, index) => (
                <div key={index} className="p-5">
                  <p className="font-sans first-letter:uppercase font-medium">{title}</p>
                  {filterCategories[title].map((category) => (
                    <button
                      key={category}
                      className={`m-2 py-2 px-4 bg-slate-200 font-sans rounded-lg text-base ${
                        filters[title].includes(category) ? "ring-2 ring-offset-1" : "ring-0"
                      } `}
                      onClick={() => {
                        handleFilterChange(title, category);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div class="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b flex-row-reverse gap-2 md:p-4 ">
              <button
                type="button"
                class="text-white bg-primary-color hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-sans"
                onClick={() => {
                  filterButtonHandler();
                  setShowFilterSection(false);
                }}
              >
                Filter
              </button>
              <button
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 font-sans "
                onClick={() => resetFilterButtonHandler()}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
