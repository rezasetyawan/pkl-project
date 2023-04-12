import { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function UserDataInputForm() {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [nis, setNis] = useState();
  const [pklPlace, setPklPlace] = useState("");
  const [pklAddress, setPklAddress] = useState("");
  const [pklStartDate, setPklStartDate] = useState();
  const [pklEndDate, setPklEndDate] = useState();

  const getSignUpData = (
    name,
    major,
    nis,
    pklPlace,
    pklAddress,
    pklStartDate,
    pklEndDate
  ) => {
    return {
      name: name,
      major: major,
      nis: nis,
      pklPlace: pklPlace,
      pklAddress: pklAddress,
      pklStartDate: pklStartDate,
      pklEndDate: pklEndDate,
    };
  };

  const resetForm = () => {
    setName("");
    setMajor("");
    setNis("");
    setPklPlace("");
    setPklAddress("");
    setPklStartDate("");
    setPklEndDate("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = getSignUpData(
      name,
      major,
      nis,
      pklPlace,
      pklAddress,
      pklStartDate,
      pklEndDate
    );

    await setDoc(doc(db, "users", nis), userData).then(() => {
      resetForm();
    });
  };

  return (
    <form
      id="UserDataInputForm"
      onSubmit={handleSubmit}
      className="w-[70%] mx-auto min-[499px]:max-w-md my-14 p-9 md:shadow-xl md:rounded-sm md:my-20"
    >
      <div className="my-4">
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
            console.log(event.target.value);
          }}
          className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
          placeholder="Your name"
          required
        />
      </div>

      <div className="my-4">
        <label
          // for="major"
          className="block text-sm text-slate-800 font-bold"
        >
          Class / Major
        </label>
        <input
          type="text"
          id="major"
          value={major}
          onChange={(event) => setMajor(event.target.value)}
          className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
          placeholder="Your class and major"
          required
        />
      </div>

      <div className="my-4">
        <label
          // for="nis"
          className="block text-sm text-slate-800 font-bold"
        >
          NIS
        </label>
        <input
          type="number"
          id="nis"
          value={nis}
          onChange={(event) => setNis(event.target.value)}
          className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
          placeholder="Your NIS"
          required
        />
      </div>

      <div className="my-4">
        <label
          // for="pklPlace"
          className="block text-sm text-slate-800 font-bold"
        >
          PKL Place
        </label>
        <input
          type="text"
          id="pklPlace"
          value={pklPlace}
          onChange={(event) => setPklPlace(event.target.value)}
          className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
          placeholder="Your PKL Place"
          required
        />
      </div>

      <div className="my-4">
        <label
          // for="pklPlace"
          className="block text-sm text-slate-800 font-bold"
        >
          Address of PKL Place
        </label>
        <input
          type="text"
          id="pklAddress"
          value={pklAddress}
          onChange={(event) => setPklAddress(event.target.value)}
          className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
          placeholder="Your PKL Place Address"
          required
        />
      </div>

      <div className="flex max-w-full gap-2 box-border my-4">
        <div className="w-[50%]">
          <label
            // for="pklStartDate"
            className="block text-sm text-slate-800 font-bold"
          >
            Start Date
          </label>
          <input
            type="date"
            id="pklStartDate"
            value={pklStartDate}
            onChange={(event) => setPklStartDate(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm"
            required
          />
        </div>

        <div className="w-[50%]">
          <label
            // for="pklEndDate"
            className="block text-sm text-slate-800 font-bold"
          >
            End Date
          </label>
          <input
            type="date"
            id="pklEndDate"
            value={pklEndDate}
            onChange={(event) => setPklEndDate(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-3 mt-8 w-full font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
