import { addCompanyAccount } from "@/auth/firebase-auth";
import { useState } from "react";

export default function AddCompanyAccountForm({
  setShowAddCompanyAccountForm,
  setIsLoading,
  setShowCompanyInfoForm,
  setCompanyId,
}) {
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
        const user = await addCompanyAccount(companyEmail, companyPassword);
        console.log(user);
        setCompanyId(user.uid);
        setIsLoading(false);
        setShowCompanyInfoForm(true);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    

  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-[100] overflow-y-scroll overflow-x-hidden h-screen p-5 bg-black/80 md:p-10">
        <div className="relative w-full flex items-center top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
          <div className="relative bg-white rounded-lg shadow w-full mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-[60%]">
            <div className="flex items-start justify-between p-2 border-b rounded-t">
              <span className="text-base font-semibold text-gray-900 block md:text-xl font-sans px-3">
                Tambah Akun Dudi
              </span>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => setShowAddCompanyAccountForm(false)}
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
                <section className="flex gap-3 mt-5 mb-8 px-3">
                  <div className="w-full">
                    <label className="block font-medium">Email</label>
                    <input
                      type="email"
                      className="border p-1 rounded-md w-full focus:outline-none focus:ring-1"
                      onChange={(event) => setCompanyEmail(event.target.value)}
                    ></input>
                  </div>
                  <div className="w-full">
                    <label className="block font-medium">Password</label>
                    <input
                      type="text"
                      minLength={8}
                      className="border p-1 rounded-md w-full focus:outline-none focus:ring-1"
                      onChange={(event) =>
                        setCompanyPassword(event.target.value)
                      }
                    ></input>
                  </div>
                </section>
                <div class="flex justify-end items-center py-2 space-x-2 rounded-b gap-2">
                  <button
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 font-sans"
                    onClick={() => setShowAddCompanyAccountForm(false)}
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
      </div>
    </>
  );
}
