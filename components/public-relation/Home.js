import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddCompanyAccountForm from "./AddCompanyAccountForm";
import SuccessModal from "../SuccessModal";
import AddCompanyInfoForm from "./AddCompanyInfoForm";
import OnContentLoading from "../OnContentLoading";

export default function PublicRelationHome() {
  const [greeting, setGreeting] = useState("");
  const [usersCount, setUsersCount] = useState(null);
  const [studentsCount, setStudentsCount] = useState(null);
  const [companiesCount, setCompaniesCount] = useState(null);
  const [showAddCompanyAccountForm, setShowAddCompanyAccountForm] =
    useState(false);
  const [showCompanyInfoForm, setShowCompanyInfoForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [companyId,setCompanyId] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  let currentDate = new Date();
  let currentHour = currentDate.getHours();

  useEffect(() => {
    if (currentHour) {
      if (currentHour >= 5 && currentHour <= 10) {
        setGreeting("Pagi");
      } else if (currentHour >= 11 && currentHour <= 14) {
        setGreeting("Siang");
      } else if (currentHour >= 15 && currentHour <= 17) {
        setGreeting("Sore");
      } else setGreeting("Malam");
    }
    getCountFromServer(collection(db, "users")).then((snap) =>
      setUsersCount(snap.data().count)
    );
    getCountFromServer(collection(db, "students")).then((snap) =>
      setStudentsCount(snap.data().count)
    );
    getCountFromServer(collection(db, "companies")).then((snap) =>
      setCompaniesCount(snap.data().count)
    );
  }, [currentHour]);

  return (
    <>
      <article className="bg-slate-50 p-5">
        <h2 className="text-2xl font-[600] text-center mb-6 font-sans">
          Dashboard
        </h2>
        <div>
          <p className="font-medium text-lg">
            {`Selamat ${greeting}`},<br></br>
            <span className="font-semibold">Humas SMKN 8 Semarang</span> :D
          </p>
        </div>
        <div className="my-5">
          <h3 className="font-semibold my-3">Data pengguna saat ini</h3>
          <section className="grid grid-cols-2 gap-3 sm:grid-rows-2">
            <div className="flex p-2 shadow-md rounded-md col-span-2 sm:row-span-2 sm:col-span-1 hover:scale-[1.02] hover:transition-transform">
              <div className="w-[50%]">
                <h4 className="font-medium mt-2">Total Pengguna</h4>
                <p className="text-7xl mt-10">{usersCount}</p>
              </div>
              <div className=" w-[50%] flex justify-end pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="min-[425px]:min-w-[96px] min-[425px]:max-w-[96px] aspect-square drop-shadow-md"
                >
                  <path
                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                    fill="#4b5563"
                  />
                </svg>
              </div>
            </div>
            <div
              className="flex p-2 shadow-md rounded-md items-center hover:scale-[1.02] hover:transition-transform hover:cursor-pointer"
              onClick={() => router.push("/public-relation/students")}
            >
              <div className="w-[50%]">
                <h4 className="font-medium">Total Data Murid</h4>
                <p className="text-3xl">{studentsCount}</p>
              </div>
              <div className=" w-[50%] flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="80"
                  height="80"
                  className="min-[425px]:min-w-[96px] min-[425px]:max-w-[96px] aspect-square drop-shadow-md"
                >
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                    fill="#4b5563"
                  />
                </svg>
              </div>
            </div>
            <div
              className="flex p-2 shadow-md rounded-md items-center hover:scale-[1.02] hover:transition-transform hover:cursor-pointer"
              onClick={() => router.push("/public-relation/companies")}
            >
              <div className="w-[50%]">
                <h4 className="font-medium">Total Data Dudi</h4>
                <p className="text-3xl">{companiesCount}</p>
              </div>
              <div className=" w-[50%] flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="min-[425px]:min-w-[96px] min-[425px]:max-w-[96px] aspect-square drop-shadow-md"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 3.33334C26.3181 3.33334 23.3334 6.3181 23.3334 10V40H16.6667C12.9848 40 10 42.9848 10 46.6667V66.6667L3.33337 66.6667V73.3333L16.6667 73.3333H23.3334H30H63.3334L76.6667 73.3333V66.6667L70 66.6667V10C70 6.3181 67.0153 3.33334 63.3334 3.33334H30ZM16.6667 53.3333H23.3334V60H16.6667V53.3333ZM43.3334 16.6667H36.6667V23.3333H43.3334V16.6667ZM56.6667 16.6667H50V23.3333H56.6667V16.6667ZM36.6667 28.3333H43.3334V35H36.6667V28.3333ZM56.6667 28.3333H50V35H56.6667V28.3333ZM50 40H56.6667V46.6667H50V40ZM56.6667 51.6667H50V58.3333H56.6667V51.6667Z"
                    fill="#4b5563"
                  />
                </svg>
              </div>
            </div>
          </section>
          <button
            className="px-3 py-1 border my-5 bg-primary-color text-white font-medium rounded-md hover:bg-blue-700 hover:ring-1"
            onClick={() => setShowAddCompanyAccountForm(true)}
          >
            Tambah Dudi
          </button>
        </div>
      </article>
      {/* {showAddCompanyAccountForm && (
        <AddCompanyAccountForm
          setShowAddCompanyAccountForm={setShowAddCompanyAccountForm}
          setIsLoading={setIsLoading}
          setShowCompanyInfoForm={setShowCompanyInfoForm}
          setCompanyId={setCompanyId}
        ></AddCompanyAccountForm>
      )}
      {showCompanyInfoForm && (
        <AddCompanyInfoForm
          setShowCompanyInfoForm={setShowCompanyInfoForm}
          setShowSuccessModal={setShowSuccessModal}
          companyId={companyId}
        ></AddCompanyInfoForm>
      )}
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={"Dudi berhasil ditambahkan"}
        ></SuccessModal>
      )}
      {isLoading && <OnContentLoading></OnContentLoading>} */}
    </>
  );
}
