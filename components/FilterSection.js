import { useState } from "react";
export default function FilteredSection({
  filtersKeyword,
  dataList,
  setDataList,
  filterTitles,
  filterCategories,
  dataSource,
  setShowFilterSection
}) {
  const [filters, setFilters] = useState(filtersKeyword);

  const handleFilterChange = (title, category) => {
    const newFilters = { ...filters };
    if (newFilters[title].includes(category)) {
      newFilters[title] = newFilters[title].filter(
        (filterCategory) => filterCategory !== category
      );
    } else {
      newFilters[title].push(category);
    }
    setFilters(newFilters);
  };

  const filterButtonHandler = () => {
    if (filters.city.length == 0 && filters.majorTarget.length == 0) {
      console.log('data source')
      console.log(dataSource)
      setDataList(dataSource)
      return
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
  };

  return (
   
      <div className="absolute top-[10%] left-[50%] w-[80%] -translate-x-2/4 -translate-y-2/4 bg-white p-10 max-h-[50vh] overflow-x-scroll  md:top-[20%] md:max-h-[60vh] shadow-xl">
      <span>Filter</span>
      {filterTitles.map((title) => (
        <div key={title}>
          <p>{title}</p>
          {filterCategories[title].map((category) => (
            <button
              key={category}
              className={`m-2 py-2 px-4 bg-slate-200 ${
                filters[title].includes(category) ? "ring-1" : "ring-0"
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
      <button
        className="m-2 py-2 px-4 bg-slate-200"
        onClick={() => {
          setFilters({
            class: [],
            major: [],
            classNumber: [],
          });
        }}
      >
        reset filter
      </button>
      <button
        className="m-2 py-2 px-4 bg-slate-200"
        onClick={() => {
          filterButtonHandler();
          console.log('filters')
          console.log(filters)
          setFilters(filters)
          setShowFilterSection(false)
        }}
      >
        filter
      </button>
    </div>
  );
}
