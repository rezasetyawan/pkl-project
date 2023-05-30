import Loading from "../Loading";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function CompanyDataForm({
  setShowCompanyDataForm,
  isEditing,
  setIsEditing,
  companyData,
  setSuccessModalMessage,
  setShowSuccessModal,
}) {
  const [companyName, setCompanyName] = useState(
    companyData ? companyData.name : ""
  );
  const [companyCity, setCompanyCity] = useState(
    companyData ? companyData.city : ""
  );
  const [companyAddress, setCompanyAddress] = useState(
    companyData ? companyData.address : ""
  );
  const [companyField, setCompanyField] = useState(
    companyData ? companyData.field : []
  );
  const [companyMajorTarget, setCompanyMajorTarget] = useState(
    companyData ? companyData.major_target : ""
  );
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(
    companyData ? companyData.phone : null
  );
  const [companyWebsite, setCompanyWebsite] = useState(
    companyData ? companyData.website : ""
  );
  const [companyMouStatus, setCompanyMouStatus] = useState(
    companyData ? companyData.isMOU : false
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    const selectedOptionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCompanyMajorTarget((companyMajorTarget) => [
        ...companyMajorTarget,
        selectedOptionValue,
      ]);
    } else {
      setCompanyMajorTarget((companyMajorTarget) =>
        companyMajorTarget.filter((option) => option !== selectedOptionValue)
      );
    }
  };

  const getCompanyData = (
    companyName,
    companyCity,
    companyAddress,
    companyField,
    companyMajorTarget,
    companyPhoneNumber,
    companyWebsite,
    companyMouStatus
  ) => {
    return {
      name: companyName.charAt(0).toUpperCase() + companyName.slice(1),
      city: companyCity,
      address: companyAddress,
      field: companyField,
      major_target: companyMajorTarget,
      phone: companyPhoneNumber,
      website: companyWebsite,
      isMOU: companyMouStatus,
    };
  };

  const resetForm = () => {
    setCompanyName("");
    setCompanyCity("");
    setCompanyAddress("");
    setCompanyField("");
    setCompanyMajorTarget([]);
    setCompanyPhoneNumber(null);
    setCompanyWebsite("");
    setCompanyMouStatus(false);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const docData = getCompanyData(
      companyName,
      companyCity,
      companyAddress,
      companyField,
      companyMajorTarget,
      companyPhoneNumber,
      companyWebsite,
      companyMouStatus
    );

    isEditing
      ? await setDoc(doc(db, "companies", companyData.id), docData, {
          merge: true,
        })
          .then(() => {
            resetForm();
            setSuccessModalMessage("Data berhasil diperbarui")
            setIsEditing(false);
          })
          .catch((error) => {
            alert(error);
          })
      : await addDoc(collection(db, "companies"), docData)
          .then(() => {
            resetForm();
            setShowCompanyDataForm(false);
          })
          .catch((error) => {
            alert(error);
          });

    setIsLoading(false);
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-[100] overflow-y-scroll overflow-x-hidden h-screen p-5 bg-black/80 md:p-10">
        <div className="relative w-full flex items-center">
          <div className="relative bg-white rounded-lg shadow w-full mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-[60%]">
            <div className="flex items-start justify-between p-2 border-b rounded-t md:p-4">
              <span className=" text-lg font-semibold text-gray-900 block md:text-xl font-sans">
                Tambah Data Dudi
              </span>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() =>
                  isEditing
                    ? setIsEditing(false)
                    : setShowCompanyDataForm(false)
                }
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
            <div className="w-full overflow-x-hidden p-5">
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <label className="block font-medium">Nama</label>
                  <input
                    type="text"
                    className="border w-full p-1"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    required
                  ></input>
                </div>
                <div className="my-2">
                  <label className="block font-medium">Kota</label>
                  <input
                    type="text"
                    className="border w-full p-1"
                    value={companyCity}
                    onChange={(event) => setCompanyCity(event.target.value)}
                    required
                  ></input>
                </div>
                <div className="my-2">
                  <label className="block font-medium">Alamat</label>
                  <input
                    type="text"
                    className="border w-full p-1"
                    value={companyAddress}
                    onChange={(event) => setCompanyAddress(event.target.value)}
                  ></input>
                </div>
                <div className="my-2">
                  <label className="block font-medium">Jenis Usaha</label>
                  <input
                    type="text"
                    className="border w-full p-1"
                    value={companyField}
                    onChange={(event) => setCompanyField(event.target.value)}
                  ></input>
                </div>
                <div className="my-2">
                  <span className="block font-medium">Target Jurusan</span>
                  <div className="flex gap-2 p-1">
                    <label className="flex justify-center gap-1">
                      <input
                        type="checkbox"
                        value="PPLG"
                        onChange={handleCheckboxChange}
                        checked={companyMajorTarget.includes("PPLG")}
                      />
                      PPLG
                    </label>
                    <label className="flex justify-center gap-1">
                      <input
                        type="checkbox"
                        value="TJKT"
                        onChange={handleCheckboxChange}
                        checked={companyMajorTarget.includes("TJKT")}
                      />
                      TJKT
                    </label>
                    <label className="flex justify-center gap-1">
                      <input
                        type="checkbox"
                        value="DKV"
                        onChange={handleCheckboxChange}
                        checked={companyMajorTarget.includes("DKV")}
                      />
                      DKV
                    </label>
                    <label className="flex justify-center gap-1">
                      <input
                        type="checkbox"
                        value="LK"
                        onChange={handleCheckboxChange}
                        checked={companyMajorTarget.includes("LK")}
                      />
                      LK
                    </label>
                    <label className="flex justify-center gap-1">
                      <input
                        type="checkbox"
                        value="PS"
                        onChange={handleCheckboxChange}
                        checked={companyMajorTarget.includes("PS")}
                      />
                      PS
                    </label>
                  </div>
                </div>
                <div className="my-2">
                  <label className="block font-medium">Telepon</label>
                  <input
                    type="tel"
                    className="border w-full p-1"
                    value={companyPhoneNumber}
                    onChange={(event) =>
                      setCompanyPhoneNumber(event.target.value)
                    }
                  ></input>
                </div>
                <div className="my-2">
                  <label className="block font-medium">Website</label>
                  <input
                    type="text"
                    className="border w-full p-1"
                    value={companyWebsite}
                    onChange={(event) => setCompanyWebsite(event.target.value)}
                  ></input>
                </div>
                <div className="my-2">
                  <label className="block font-medium">MOU</label>

                  <div className="inline-block mr-4">
                    <label className="flex justify-center gap-1">
                      <input
                        type="radio"
                        name="isMOU"
                        value={true}
                        className="border p-1 w-[1.3em] h-[1.3em]"
                        onChange={() => {
                          setCompanyMouStatus(true);
                        }}
                      ></input>{" "}
                      iya
                    </label>
                  </div>

                  <div className="inline-block">
                    <label className="flex justify-center gap-1">
                      <input
                        type="radio"
                        name="isMOU"
                        tabIndex={0}
                        value={false}
                        className="border p-1 w-[1.3em] h-[1.3em]"
                        onChange={() => {
                          setCompanyMouStatus(false);
                        }}
                      ></input>{" "}
                      tidak
                    </label>
                  </div>
                </div>
                <div class="flex justify-end items-center py-2 space-x-2 border-t border-gray-200 rounded-b gap-2 md:py-4 ">
                  <button
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 font-sans "
                    onClick={() =>
                      isEditing
                        ? setIsEditing(false)
                        : setShowCompanyDataForm(false)
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="text-white bg-primary-color hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-sans"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isLoading && <Loading></Loading>}
      </div>
    </>
  );
}
