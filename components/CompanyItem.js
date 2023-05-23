import Loading from "./Loading";
import Error from "./Error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserDataContext } from "@/context/UserContext";

export default function CompanyItem({ isLoading, error, filteredCompanies }) {
  const router = useRouter();
  const userData = useContext(UserDataContext);
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
          onClick={() =>
            userData.role === "student"
              ? router.push(`/student/company/${company.id}`)
              : router.push(`/public-relation/company/${company.id}`)
          }
        >
          <div className="flex items-center overflow-hidden min-w-[25%] max-w-[25%]">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-[425px]:min-w-[80px] min-[425px]:max-w-[80px] aspect-square drop-shadow-md"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30 3.33334C26.3181 3.33334 23.3334 6.3181 23.3334 10V40H16.6667C12.9848 40 10 42.9848 10 46.6667V66.6667L3.33337 66.6667V73.3333L16.6667 73.3333H23.3334H30H63.3334L76.6667 73.3333V66.6667L70 66.6667V10C70 6.3181 67.0153 3.33334 63.3334 3.33334H30ZM16.6667 53.3333H23.3334V60H16.6667V53.3333ZM43.3334 16.6667H36.6667V23.3333H43.3334V16.6667ZM56.6667 16.6667H50V23.3333H56.6667V16.6667ZM36.6667 28.3333H43.3334V35H36.6667V28.3333ZM56.6667 28.3333H50V35H56.6667V28.3333ZM50 40H56.6667V46.6667H50V40ZM56.6667 51.6667H50V58.3333H56.6667V51.6667Z"
                fill="#475569"
              />
            </svg>
          </div>
          <div className="max-w-[70%]">
            <h3 className="font-semibold border-b-2 border-slate-300 text-left max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-base">
              <Link
                href={
                  userData.role === "student"
                    ? `/student/company/${company.id}`
                    : `/public-relation/company/${company.id}`
                }
                className=" focus:outline-none focus:ring-2"
              >
                {company.name || "-"}
              </Link>
              <sup
                className={`font-bold text-[10px] leading-4 ml-1 text-[#0066ff] ${
                  !company.isMOU && "hidden"
                }`}
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
                : {company.major_target ? company.major_target.join(", ") : "-"} 
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
