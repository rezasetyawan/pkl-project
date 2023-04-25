import { Suspense, useState } from "react";
import CompanyList from "./CompanyList";
export default function CompanyPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <h2 className="text-2xl font-[600] text-center mt-5 mb-6">
        Dunia Industri
      </h2>
      <div className="box-border px-6 md:max-w-lg md:flex md:flex-row-reverse md:gap-1">
        <input
          type="text"
          placeholder="Search company here"
          onChange={(event) => setQuery(event.target.value)}
          className="bg-[#E9E9E9] w-full h-8 px-2 py-4 rounded-md font-medium placeholder:text-black/40 placeholder:font-[600] focus:outline-none"
        ></input>
        <button className="bg-[#E9E9E9] font-[600] text-black/60 py-1 px-2 rounded-md my-2 md:my-0 md:min-w-fit">
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
      <div className="px-6">
        <Suspense fallback={<h3>Loading....</h3>}>
          <CompanyList query={query} setQuery={setQuery}></CompanyList>
        </Suspense>
      </div>
    </>
  );
}
