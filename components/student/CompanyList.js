import Loading from "../Loading";
import Error from "../Error";

export default function CompanyList({ isLoading, error, filteredCompanies }) {
  console.log("from company list ");
  console.log(filteredCompanies);

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error} />;
  if (filteredCompanies.length < 1)
  return <Error errorMessage={"Company Not Found"} errorCode={"404"} />;

  return (
    <div className="grid grid-cols-1 gap-2 mt-7 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
      {filteredCompanies.map((company) => (
        <div
          className="p-3 flex gap-3 rounded-md shadow-md"
          key={company.id}
        >
          <div className="flex items-center overflow-hidden">
            <svg
              width="80"
              height="79"
              viewBox="0 0 80 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 aspect-square drop-shadow-md"
            >
              <path
                d="M6.66663 69.125H73.3333"
                stroke="black"
                stroke-width="4"
                stroke-linecap="square"
                stroke-linejoin="square"
              />
              <path
                d="M23.3334 42.7917H16.6667C14.8258 42.7917 13.3334 44.2654 13.3334 46.0833V65.8333C13.3334 67.6513 14.8258 69.125 16.6667 69.125H23.3334C25.1743 69.125 26.6667 67.6513 26.6667 65.8333V46.0833C26.6667 44.2654 25.1743 42.7917 23.3334 42.7917Z"
                stroke="black"
                stroke-width="4"
                stroke-linejoin="square"
              />
              <path
                d="M20 55.9583H21.6667"
                stroke="black"
                stroke-width="4"
                stroke-linecap="square"
                stroke-linejoin="square"
              />
              <path
                d="M63.3333 6.58334H30C28.159 6.58334 26.6666 8.05707 26.6666 9.875V65.8333C26.6666 67.6513 28.159 69.125 30 69.125H63.3333C65.1742 69.125 66.6666 67.6513 66.6666 65.8333V9.875C66.6666 8.05707 65.1742 6.58334 63.3333 6.58334Z"
                stroke="black"
                stroke-width="4"
                stroke-linejoin="square"
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
          <div>
            <h3 className="font-extrabold border-b-2 border-slate-300">
              {company.name}
            </h3>
            <div className="text-sm text-slate-700 mt-1">
              <p>
                <span className="font-bold inline-block">Kota</span>
                <span className="font-semibold">: {company.city}</span>
              </p>
              <pa>
                <span className="font-bold inline-block">Jurusan </span>
                <span className="font-semibold">
                  : {company.major_target.toUpperCase()}
                </span>
              </pa>
              <p>
                <span className="font-bold inline-block">Jenis Usaha </span>
                <span className="font-semibold">: {company.field}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
