import { useMemo, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import CompanyIcon from "../../public/icon/company-icon.svg";
import { db } from "@/lib/firebase";
import useSWR from "swr";

export default function CompanyList({ query, setQuery }) {
  //   const [company, setCompany] = useState([]);

  const fetcher = async (collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const companyData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [...companyData];
  };

  const { data, error } = useSWR("companies", fetcher, {
    suspense: true,
  });

  const filteredCompanies = useMemo(() => {
    return data.filter((companyData) => {
      return companyData.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);

  return (
    <div className="grid grid-cols-1 gap-2 mt-7 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
      {filteredCompanies.map((company) => (
        <div className="p-3 flex gap-3 bg-white rounded-md shadow-md" key={company.id}>
          <div className="flex items-center overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-20 aspect-square"
              fill="#0066ff"
            >
              <path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold border-b-2 border-slate-300">{company.name}</h3>
            <div className="text-sm text-slate-700 mt-1">
              <p className="font-bold">Kota:<span className="font-semibold">{company.city.toUpperCase()}</span></p>
              <p className="font-bold">Jurusan: <span className="font-semibold">{company.major_target.toUpperCase()}</span></p>
              <p className="font-bold">Jenis Usaha: <span className="font-semibold">{company.field}</span></p>
            </div>
            {/* <p className="w-full text-ellipsis text-sm max-h-20 overflow-y-auto">
              {company.address}
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
}
