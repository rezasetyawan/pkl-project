import BackButtonIcon from "../../public/icon/back-button-icon.svg";
import UserIcon from "../../public/icon/user-icon.svg";
import LogOutButtonIcon from "../../public/icon/logout-button-icon.svg";
import EditButtonIcon from "../../public/icon/edit-button-icon.svg";
import { useRouter } from "next/router";
import { useDocumentByID } from "@/lib/firestore";
import { useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import StudentDataInputForm from "./StudentDataInput";

export default function StudentProfile() {
  const [studentData, setStudentData] = useState({});
  const [showEditSection, setShowEditSection] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();

  const { documentData, isLoading, error } = useDocumentByID(
    "students",
    user.displayName
  );

  useMemo(() => {
    documentData && setStudentData(documentData);
  }, [documentData]);

  const manageButtonHandler = () => {
    console.log("clicked");
    setShowEditSection(true);
  };

  console.log("student data");
  console.log(studentData);

  return showEditSection ? (
    <StudentDataInputForm studentData={studentData} isEditing={showEditSection} setIsEditing={setShowEditSection}>
      <button
        className="absolute top-8 left-3 min-[425px]:left-2 min-[425px]:top-6 p-3 hover:scale-110 transition-transform"
        onClick={() => setShowEditSection(false)}
      >
        <BackButtonIcon />
      </button>
    </StudentDataInputForm>
  ) : (
    <article className="w-full min-h-full pb-6 bg-white mx-auto sm:max-w-md sm:shadow-md">
      <div className="flex items-center justify-center gap-20 pt-8 min-[375px]:gap-28">
        <button
          className="p-3 hover:scale-110 transition-transform hover:ring-2 rounded-md"
          onClick={() => router.back()}
        >
          <BackButtonIcon />
        </button>
        <h2 className="font-sans text-2xl font-semibold">Profile</h2>
        <button className="px-3 py-2 hover:scale-110 transition-transform hover:ring-2 rounded-md">
          <LogOutButtonIcon />
        </button>
      </div>
      <section className="text-center w-full font-medium ">
        <div className="overflow-hidden rounded-[50%] w-24 h-24 mx-auto border flex justify-center p-1 mt-8">
          <UserIcon />
        </div>
        <h3 className="font-sans text-xl mt-3">{studentData.name}</h3>
        <h4 className="font-sans text-black/60 text-sm">
          {studentData.class}/{studentData.major} {studentData.classNumber}
        </h4>
        <h4 className="font-sans text-black/60 text-sm">
          {studentData.nis || "-"}
        </h4>
        <button
          className="flex mt-2 gap-1 items-center mx-auto font-sans text-[#5e5e5e] p-1 border border-[#717171] rounded-md hover:"
          onClick={manageButtonHandler}
        >
          Manage <EditButtonIcon />
        </button>
      </section>
      <section className="mx-10 my-6 px-5 py-4 border border-[#717171] rounded-md">
        <h4 className="font-sans font-sm font-medium text-center">
          Intern Detail
        </h4>
        <div className="text-sm font-normal">
          <div className="my-3">
            <h5 className="font-sans font-medium">PKL Place</h5>
            <p className="border-black/40 border-b-[1px] font-sans">
              {studentData.pklPlace || "-"}
            </p>
          </div>

          <div className="my-3">
            <h5 className="font-sans font-medium">PKL Address</h5>
            <p className="border-black/40 border-b-[1px] font-sans">
              {studentData.pklAddress || "-"}
            </p>
          </div>

          <div className="mt-3">
            <h5 className="font-sans font-medium">PKL Date</h5>
            <div className="flex gap-5 font-normal text-center">
              <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                {studentData.pklStartDate || "-"}
              </p>
              -
              <p className="w-[50%] border-black/40 border-b-[1px] font-sans">
                {studentData.pklEndDate || "-"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
