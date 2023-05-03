import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { uploadingCertificate, getCertificateUrl } from "@/lib/fileUpload";
import NextButtonIcon from "../../public/icon/next-button-icon.svg";

export default function StudentDataInputForm() {
  const [name, setName] = useState("");
  const [studentClass, setstudentClass] = useState("");
  const [nis, setNis] = useState(null);
  const [pklPlace, setPklPlace] = useState("");
  const [pklAddress, setPklAddress] = useState("");
  const [pklStartDate, setPklStartDate] = useState(null);
  const [pklEndDate, setPklEndDate] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      if (event.target.files[0].type === "application/pdf") {
        setError(null);
        setCertificate(event.target.files[0]);
        return;
      }
      setError("File must be pdf");
    }
  };

  const getSignUpData = (
    name,
    studentClassArrayData,
    nis,
    pklPlace,
    pklAddress,
    pklStartDate,
    pklEndDate
  ) => {
    return {
      name: name,
      class: studentClassArrayData[0],
      major: studentClassArrayData[1],
      classNumber: studentClassArrayData[2],
      nis: nis,
      pklPlace: pklPlace,
      pklAddress: pklAddress,
      pklStartDate: pklStartDate,
      pklEndDate: pklEndDate,
    };
  };

  const resetForm = () => {
    setName("");
    setstudentClass("");
    setNis("");
    setPklPlace("");
    setPklAddress("");
    setPklStartDate("");
    setPklEndDate("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentClassArrayData = studentClass.split(" ");
    console.log(studentClassArrayData);
    const userData = getSignUpData(
      name,
      studentClassArrayData,
      nis,
      pklPlace,
      pklAddress,
      pklStartDate,
      pklEndDate
    );

    await setDoc(doc(db, "students", nis), userData)
      .then(() => {
        if (certificate === null) {
          return router.push("/student/");
        }
      })
      .catch((error) => {
        setError(error);
      });

    uploadingCertificate(nis, certificate)
      .then(async () => {
        const certificateUrl = await getCertificateUrl(nis);
        await updateDoc(doc(db, "students", nis), {
          certificateUrl: certificateUrl,
        });
        resetForm();
        router.push("/student/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="w-full mt-5 mx-auto flex items-center justify-center min-[499px]:max-w-[75%] md:max-w-md md:shadow-[0_0_10px_0_rgba(0,0,0,0.2)] md:rounded-sm md:my-0">
        <form
          id="UserDataInputForm"
          onSubmit={handleSubmit}
          className="w-[75%] md:my-5"
        >
          <div className="mt-0 mb-3">
            <label
              // for="name"
              className="block text-sm text-slate-800 font-bold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
              placeholder="Your name"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold">
              Class
            </label>
            <input
              type="text"
              id="studentClass"
              value={studentClass}
              onChange={(event) => setstudentClass(event.target.value)}
              className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
              placeholder="XI PPLG 3"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold">
              NIS
            </label>
            <input
              type="number"
              id="nis"
              value={nis}
              onChange={(event) => setNis(event.target.value)}
              className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
              placeholder="10146"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold">
              PKL Place
            </label>
            <input
              type="text"
              id="pklPlace"
              value={pklPlace}
              onChange={(event) => setPklPlace(event.target.value)}
              className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
              placeholder="Your PKL Place"
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold">
              Address of PKL Place
            </label>
            <input
              type="text"
              id="pklAddress"
              value={pklAddress}
              onChange={(event) => setPklAddress(event.target.value)}
              className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
              placeholder="Your PKL Place Address"
            />
          </div>

          <div className="flex max-w-full gap-2 box-border my-3">
            <div className="w-[50%]">
              <label className="block text-sm text-slate-800 font-bold">
                Start Date
              </label>
              <input
                type="date"
                id="pklStartDate"
                value={pklStartDate}
                onChange={(event) => setPklStartDate(event.target.value)}
                className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm"
              />
            </div>

            <div className="w-[50%]">
              <label className="block text-sm text-slate-800 font-bold">
                End Date
              </label>
              <input
                type="date"
                id="pklEndDate"
                value={pklEndDate}
                onChange={(event) => setPklEndDate(event.target.value)}
                className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm"
              />
            </div>
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold">
              Certificate
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full before:mr-4 before:px-4 before:pt-4 before:pb-3 before:cursor-pointer before:rounded-xl before:content-[url('../public/icon/add-icon.svg')] before:bg-black/40 file:hidden pb-3 py-4 pr-3 my-3 font-semibold"
            />
            <p className="mt-1 text-slate-500 text-sm" id="file_input_help">
              Only PDF
            </p>
          </div>

          {error && <strong className="font-bold text-red-600">{error}</strong>}

          <button
            type="submit"
            disabled={error ? true : false}
            className={`${
              error
                ? "cursor-not-allowed bg-black/30 mt-10 rounded-md text-center  py-4 px-5 float-right mr-0"
                : "bg-primary-color mt-10 rounded-md text-center  py-4 px-5 float-right mr-0"
            }`}
          >
            <NextButtonIcon />
          </button>
        </form>
      </div>
    </>
  );
}
