import Loading from "../Loading";
import Error from "../Error";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompanyList({ isLoading, error, filteredCompanies }) {
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error} />;
  if (filteredCompanies.length < 1)
    return <Error errorMessage={"Company Not Found"} errorCode={"404"} />;

  return (
    <div className="grid grid-cols-1 gap-2 mt-7 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCompanies.map((company) => (
        <div
          className="bg-white p-3 flex gap-3 rounded-md shadow-md hover:cursor-pointer hover:ring-2 hover:ring-[#0066ff] hover:ring-offset-1 hover:ring-offset-slate-200 hover:scale-[1.02] hover:transition-transform"
          key={company.id}
          onClick={() => router.push(`/student/company/${company.id}`)}
        >
          <div className="flex items-center overflow-hidden min-w-[25%] max-w-[25%]">
            <svg
              width="80"
              height="79"
              viewBox="0 0 80 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-[425px]:min-w-[80px] min-[425px]:max-w-[80px] aspect-square drop-shadow-md"
            >
              <path
                d="M6.66663 69.125H73.3333"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="square"
                strokeLinejoin="square"
              />
              <path
                d="M23.3334 42.7917H16.6667C14.8258 42.7917 13.3334 44.2654 13.3334 46.0833V65.8333C13.3334 67.6513 14.8258 69.125 16.6667 69.125H23.3334C25.1743 69.125 26.6667 67.6513 26.6667 65.8333V46.0833C26.6667 44.2654 25.1743 42.7917 23.3334 42.7917Z"
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="square"
              />
              <path
                d="M20 55.9583H21.6667"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="square"
                strokeLinejoin="square"
              />
              <path
                d="M63.3333 6.58334H30C28.159 6.58334 26.6666 8.05707 26.6666 9.875V65.8333C26.6666 67.6513 28.159 69.125 30 69.125H63.3333C65.1742 69.125 66.6666 67.6513 66.6666 65.8333V9.875C66.6666 8.05707 65.1742 6.58334 63.3333 6.58334Z"
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="square"
              />
              <path
                d="M43.3333 16.4583H36.6666V23.0417H43.3333V16.4583Z"
                fill="black"
              />
              <path
                d="M56.6667 16.4583H50V23.0417H56.6667V16.4583Z"
                fill="black"
              />
              <path
                d="M43.3333 27.9792H36.6666V34.5625H43.3333V27.9792Z"
                fill="black"
              />
              <path
                d="M56.6667 27.9792H50V34.5625H56.6667V27.9792Z"
                fill="black"
              />
              <path d="M56.6667 39.5H50V46.0833H56.6667V39.5Z" fill="black" />
              <path
                d="M56.6667 51.0208H50V57.6042H56.6667V51.0208Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="max-w-[70%]">
            <h3 className="font-semibold border-b-2 border-slate-300 text-left max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-base">
              <Link href={`/student/company/${company.id}`}>
                {company.name || "-"}
              </Link>
              <sup
                className={`font-bold text-[10px] leading-4 ml-1 text-[#0066ff]`}
              >
                MOU
              </sup>
            </h3>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[50px] sm:text-sm">
                City
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase leading-5">
                : {company.city || "-"}
              </p>
            </div>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[50px] sm:text-sm">
                Major
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase leading-5">
                : {company.major_target || "-"}
              </p>
            </div>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[50px] sm:text-sm">
                Field
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] leading-5">
                : {company.field || "-"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
