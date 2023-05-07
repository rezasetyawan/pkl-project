import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { uploadingCertificate, getCertificateUrl } from "@/lib/fileUpload";
import NextButtonIcon from "../../public/icon/next-button-icon.svg";

export default function StudentDataInputForm({
  isEditing,
  setIsEditing,
  studentData,
  children,
}) {
  console.log("is editing" + isEditing);
  const [name, setName] = useState(studentData ? studentData.name : "");
  const [studentClass, setstudentClass] = useState(
    studentData
      ? `${studentData.class} ${studentData.major} ${studentData.classNumber}`
      : ""
  );
  const [nis, setNis] = useState(studentData ? studentData.nis : null);
  const [pklPlace, setPklPlace] = useState(
    studentData ? studentData.pklPlace : ""
  );
  const [pklAddress, setPklAddress] = useState(
    studentData ? studentData.pklAddress : ""
  );
  const [pklStartDate, setPklStartDate] = useState(
    studentData ? studentData.pklStartDate : ""
  );
  const [pklEndDate, setPklEndDate] = useState(
    studentData ? studentData.pklEndDate : ""
  );
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
      .then()
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    if (!certificate) {
      isEditing ? setIsEditing(false) : router.push("/student/");
      return;
    }

    uploadingCertificate(nis, certificate)
      .then(async () => {
        const certificateUrl = await getCertificateUrl(nis);
        await updateDoc(doc(db, "students", nis), {
          certificateUrl: certificateUrl,
        });
        resetForm();
        isEditing ? setIsEditing(false) : router.push("/student/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  console.log();
  return (
    <>
      <div className="relative w-full pt-5 pb-36 mx-auto flex flex-col items-center justify-center min-[499px]:max-w-[75%] sm:max-w-md sm:shadow-xl sm:rounded-sm sm:my-0 bg-white sm:pt-3 sm:pb-0 lg:min-h-full">
        {children}
        <h2 className="font-sans text-xl font-semibold p-4">
          Personal Data Form
        </h2>
        <form
          id="UserDataInputForm"
          onSubmit={handleSubmit}
          className="w-[75%] md:my-5"
        >
          <div className="mt-0 mb-3">
            <label
              // for="name"
              className="block text-sm text-slate-800 font-bold font-sans"
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
              className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-black/40 font-sans"
              placeholder="Your name"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold font-sans">
              Class
            </label>
            <input
              type="text"
              id="studentClass"
              value={studentClass}
              onChange={(event) => setstudentClass(event.target.value)}
              className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-black/40 font-sans"
              placeholder="XI PPLG 3"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold font-sans">
              NIS
            </label>
            <input
              type="number"
              id="nis"
              value={nis}
              onChange={(event) => setNis(event.target.value)}
              className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-black/40 font-sans"
              placeholder="10146"
              required
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold font-sans">
              PKL Place <span className="text-xs italic">(optional)</span>
            </label>
            <input
              type="text"
              id="pklPlace"
              value={pklPlace}
              onChange={(event) => setPklPlace(event.target.value)}
              className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-black/40 font-sans"
              placeholder="Your PKL Place"
            />
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold font-sans">
              Address of PKL Place{" "}
              <span className="text-xs italic">(optional)</span>
            </label>
            <input
              type="text"
              id="pklAddress"
              value={pklAddress}
              onChange={(event) => setPklAddress(event.target.value)}
              className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-black/40 font-sans"
              placeholder="Your PKL Place Address"
            />
          </div>

          <div className="flex max-w-full gap-2 box-border my-3">
            <div className="w-[50%]">
              <label className="block text-sm text-slate-800 font-bold font-sans">
                Start Date <span className="text-xs italic">(optional)</span>
              </label>
              <input
                type="date"
                id="pklStartDate"
                value={pklStartDate}
                onChange={(event) => setPklStartDate(event.target.value)}
                className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm"
              />
            </div>

            <div className="w-[50%]">
              <label className="block text-sm text-slate-800 font-bold font-sans">
                End Date <span className="text-xs italic">(optional)</span>
              </label>
              <input
                type="date"
                id="pklEndDate"
                value={pklEndDate}
                onChange={(event) => setPklEndDate(event.target.value)}
                className="w-full py-1 border-b-2 border-black/40 focus:outline-none focus:border-primary-color placeholder:text-sm"
              />
            </div>
          </div>

          <div className="my-3">
            <label className="block text-sm text-slate-800 font-bold font-sans">
              Certificate <span className="text-xs italic">(optional)</span>
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

          {error && (
            <strong className="font-bold font-sans text-red-600">
              {error}
            </strong>
          )}

          <button
            type="submit"
            disabled={error ? true : false}
            className={`${
              error
                ? "cursor-not-allowed bg-black/30 mt-10 rounded-md text-center  py-4 px-5 float-right mr-0"
                : "bg-primary-color mt-10 rounded-md text-center py-4 px-5 float-right mr-0"
            }`}
          >
            <NextButtonIcon />
          </button>
        </form>
      </div>
    </>
  );
}
