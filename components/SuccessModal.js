export default function SuccessModal({
  setShowSuccessModal,
  message,
}) {
  return (
    <section>
      <div
        tabindex="-1"
        className="fixed top-0 left-0 right-0 z-[100] w-full overflow-hidden h-screen p-5 bg-black/80 "
      >
        <div className="relative w-full max-w-sm max-h-full mx-auto top-[20%] md:top-[25%]">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => setShowSuccessModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-[#656161]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="mx-auto my-4 w-14 h-14 animate-pulse"
              >
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" fill="#22c55e"
                />
              </svg>

              <span className="mb-5 text-lg font-sans block font-semibold">
                {message || 'Success'} 
              </span>
              <button
                type="button"
                className="text-white font-sans bg-primary-color hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2"
                onClick={()=> setShowSuccessModal(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
