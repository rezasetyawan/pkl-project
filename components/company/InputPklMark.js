import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import Loading from "../Loading";
import SuccessModal from "../SuccessModal";

export default function InputPklMarkForm() {
  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [token, setToken] = useState("");
  const [pklMarks, setPklMarks] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const renderElements = () => {
    const elements = [];
    for (let i = 0; i < inputFieldCounter; i++) {
      elements.push(
        <div className="flex gap-3 px-1 py-[2px] my-2 justify-center items-center w-full shadow-md rounded-md">
          <div className="block font-semibold text-sm sm:text-base text-center">
            {i + 1}.
          </div>
          <div className="flex items-center">
            <label className="block font-semibold mr-2 text-sm sm:text-base text-center">
              NIS
            </label>
            <input
              type="number"
              className="my-2 block w-[90%] bg-[#E9E9E9] focus:outline-none rounded-md px-1 py-[2px] font-medium"
              onChange={(event) =>
                handleNisInputValueChange(event.target.value, i)
              }
            ></input>
          </div>

          <div className="flex items-center">
            <label className="block font-semibold mr-2 text-sm sm:text-base text-center">
              Nilai
            </label>
            <input
              type="number"
              className="my-2 block w-[90%] bg-[#E9E9E9] focus:outline-none rounded-md px-1 py-[2px] font-medium"
              onChange={(event) =>
                handleMarkInputValueChange(event.target.value, i)
              }
            ></input>
          </div>
        </div>
      );
    }
    return elements;
  };

  const handleMarkInputValueChange = (value, index) => {
    setPklMarks((prevMarks) => {
      const updatedMarks = [...prevMarks];
      updatedMarks[index] = { ...updatedMarks[index], pklMark: value };
      return updatedMarks;
    });
  };
  const handleNisInputValueChange = (value, index) => {
    setPklMarks((prevMarks) => {
      const updatedMarks = [...prevMarks];
      updatedMarks[index] = { ...updatedMarks[index], nis: value };
      return updatedMarks;
    });
  };

  const checkTokenValidation = async () => {
    try {
      const document = await getDoc(doc(db, "intern_evaluator", token));
      let returnValue = true;

      pklMarks.forEach((mark) => {
        if (!document.data().pklParticipant.includes(mark.nis)) {
          alert("ngapain luwh");
          returnValue = false;
          return;
        }
      });

      return returnValue;
    } catch (error) {
      alert("tokennya salah bang");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (!token) {
      return alert("masukan token terlebih dahulu");
    }

    const isTokenValid = await checkTokenValidation();
    !isTokenValid && setIsLoading(false);

    isTokenValid &&
      pklMarks.forEach((mark) => {
        const querySnapshot = query(
          collection(db, "students"),
          where("nis", "==", mark.nis)
        );

        getDocs(querySnapshot)
          .then((docSnapshot) => {
            docSnapshot.forEach(async (document) => {
              await setDoc(
                doc(db, "students", document.id),
                { pklMark: mark.pklMark },
                { merge: true }
              );
              setIsLoading(false);
              setShowSuccessModal(true);
            });
          })
          .catch((error) => {
            return alert("Error getting documents:", error);
          });
      });
  };

  const elements = renderElements();

  return (
    <>
      <article className="h-screen bg-white">
        <h2 className="text-2xl font-[600] text-center mb-6 font-sans py-5">
          Input Nilai Siswa
        </h2>
        <form
          onSubmit={handleSubmit}
          className="relative text-center mx-auto max-w-md px-5"
        >
          <div className="mt-5">
            <label className="block font-semibold">Token</label>
            <input
              value={token}
              type="text"
              className="border-2 bg-[#E9E9E9] focus:outline-none rounded-md px-1 py-[2px] font-medium"
              onChange={(event) => setToken(event.target.value)}
            ></input>
          </div>

          <div className="my-5">
            {elements.map((element, index) => element)}
          </div>

          <div className="flex gap-3 justify-end items-center">
            <button
              type="button"
              className="bg-[#EFEFEF] px-4 py-1 rounded-md font-bold text-primary-color"
              onClick={() => {
                setInputFieldCounter(
                  inputFieldCounter === 1 ? 1 : inputFieldCounter - 1
                );
                pklMarks.pop();
              }}
            >
              -
            </button>
            <button
              type="button"
              className="bg-[#EFEFEF] px-4 py-1 rounded-md font-bold text-primary-color"
              onClick={() => {
                setInputFieldCounter(inputFieldCounter + 1);
                setPklMarks((prevMarks) => [...prevMarks, {}]);
              }}
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="border py-3 px-10 w-full text-white font-semibold text-sm rounded-md mt-40 bg-primary-color hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {isLoading && <Loading></Loading>}
      </article>
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          message={"Nilai berhasil di input"}
        ></SuccessModal>
      )}
    </>
  );
}
