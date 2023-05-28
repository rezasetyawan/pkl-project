import Loading from "../Loading";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function AddCompanyForm({
  setShowAddCompanyForm,
  setShowSuccessModal,
}) {
  const [pklParticipantCount, setPklParticipantCount] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [companyPklParticipant, setCompanyPklParticipant] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  const generateRandomToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 4;
  
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
  
    return token;
  }

  const handleParticipantInputChange = (index, event) => {
    const participantValue = event.target.value;
    setCompanyPklParticipant((prevParticipants) => {
      const updatedParticipants = [...prevParticipants];
      updatedParticipants[index] = participantValue;
      return updatedParticipants;
    });
  };

  const handleAddParticipant = () => {
    setPklParticipantCount(pklParticipantCount + 1);
  };

  const handleRemoveParticipant = () => {
    setPklParticipantCount(pklParticipantCount - 1);
    setCompanyPklParticipant((prevParticipants) => {
      const updatedParticipants = [...prevParticipants];
      updatedParticipants.splice(pklParticipantCount - 1, 1);
      return updatedParticipants;
    });
  };

  const renderPklParticipantInputElements = () => {
    const elements = [];
    for (let i = 0; i < pklParticipantCount; i++) {
      elements.push(
        <input
          key={i}
          name="pklParticipant"
          type="number"
          className="w-full border p-1 rounded-md focus:outline-none focus:ring-1 placeholder:text-sm"
          onChange={(event) => handleParticipantInputChange(i, event)}
          placeholder="NIS"
          required={true}
        ></input>
      );
    }
    return elements;
  };

  const submitHandler = async (event) => {
    setIsLoading(true)
    event.preventDefault();
    const token = generateRandomToken()
    const internEvaluatorData = {
      token: token,
      name: companyName,
      pklParticipant: companyPklParticipant,
    }
    await setDoc(doc(db, "intern_evaluator", token), internEvaluatorData, { merge: true })
    .then(()=>{
      setIsLoading(false)
      setShowAddCompanyForm(false)
      setShowSuccessModal(true)
    })
    .catch((error) => {
      alert(error);
    });

  };

  const pklParticipantInputElement = renderPklParticipantInputElements();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-[100] overflow-y-scroll overflow-x-hidden h-screen p-5 bg-black/80 md:p-10">
        <div className="relative w-full  flex items-center top-[40%] left-[50%] -translate-x-2/4 -translate-y-2/4 sm:top-[50%]">
          <div className="relative bg-white rounded-lg shadow w-full mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="flex items-start justify-between p-2 border-b rounded-t">
              <span className="text-base font-semibold text-gray-900 block md:text-xl font-sans px-3">
                Tambah Dudi
              </span>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => setShowAddCompanyForm(false)}
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

            <div className="p-2">
              <form onSubmit={submitHandler}>
                <section className="px-3 min-h-[300px] max-h-[300px] overflow-y-scroll">
                  <div className="w-full flex items-center my-2">
                    <label className="block font-medium min-w-[100px]">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border p-1 rounded-md focus:outline-none focus:ring-1 placeholder:text-sm"
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder="Nama Perusahaan"
                      required={true}
                    ></input>
                  </div>

                  <div className="w-full flex my-2">
                    <label className="block font-medium min-w-[100px] pt-1">
                      Peserta PKL
                    </label>
                    <div className="flex flex-col w-full gap-2">
                      {pklParticipantInputElement}
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="px-4 py-1 text-white text-lg font-semibold bg-primary-color rounded-md hover:bg-blue-700 mr-2"
                      onClick={handleRemoveParticipant}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 text-white text-lg font-semibold bg-primary-color rounded-md hover:bg-blue-700"
                      onClick={handleAddParticipant}
                    >
                      +
                    </button>
                  </div>
                </section>
                <div class="flex justify-end items-center py-2 space-x-2 rounded-b gap-2">
                  <button
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 font-sans"
                    onClick={() => setShowAddCompanyForm(false)}
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
