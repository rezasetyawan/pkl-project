import Loading from "../Loading";
import Error from "../Error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserDataContext } from "@/context/UserContext";

export default function StudentItem({ isLoading, error, filteredStudents }) {
  const router = useRouter();

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error} />;
  if (filteredStudents.length < 1)
    return <Error errorMessage={"Student Not Found"} errorCode={"404"} />;

  return (
    <div className="grid grid-cols-1 gap-2 mt-7 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filteredStudents.map((student) => (
        <div
          className="bg-white p-3 flex gap-3 rounded-md shadow-md hover:cursor-pointer hover:ring-2 hover:ring-[#0066ff] hover:ring-offset-1 hover:ring-offset-slate-200 hover:scale-[1.02] hover:transition-transform"
          key={student.id}
          onClick={() => router.push(`/public-relation/student/${student.id}`)}
        >
          <div className="flex items-center overflow-hidden min-w-[25%] max-w-[25%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="80"
              height="80"
              className="min-[425px]:min-w-[80px] min-[425px]:max-w-[80px] aspect-square drop-shadow-md"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                fill="#898f9a"
              />
            </svg>
          </div>
          <div className="max-w-[70%]">
            <h3 className="font-semibold border-b-2 border-slate-300 text-left max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm sm:text-base">
              <Link href={`/public-relation/student/${student.id}`}>
                {student.name || "-"}
              </Link>
            </h3>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[70px] sm:text-sm">
                Class
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase leading-5">
                :{" "}
                {`${student.class} ${student.major} ${student.classNumber}` ||
                  "-"}
              </p>
            </div>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[70px] sm:text-sm">
                NIS
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] uppercase leading-5">
                : {student.nis || "-"}
              </p>
            </div>
            <div className="flex my-1">
              <p className="font-sans text-[#3e3c3c] text-left font-semibold text-xs min-w-[70px] sm:text-sm">
                PKL Date
              </p>
              <p className="font-sans text-black/60 text-xs font-semibold text-left max-w-[80%] leading-5">
                :{" "}
                {!student.pklStartDate && !student.pklEndDate ? (
                  "-"
                ) : (
                  <>
                    {" "}
                    <span>
                      {student.pklStartDate
                        ? `${student.pklStartDate.split("-")[2]}/${
                            student.pklStartDate.split("-")[1]
                          }/${student.pklStartDate.split("-")[0]}`
                        : "?"}
                    </span>{" "}
                    -{" "}
                    <span>
                      {student.pklEndDate
                        ? `${student.pklEndDate.split("-")[2]}/${
                            student.pklEndDate.split("-")[1]
                          }/${student.pklEndDate.split("-")[0]}`
                        : "?"}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
