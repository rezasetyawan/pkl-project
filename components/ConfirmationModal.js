export default function ConfirmationModal({
  setShowConfirmationModal,
  actionFunction,
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
              onClick={() => setShowConfirmationModal(false)}
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
                aria-hidden="true"
                className="mx-auto mb-4 text-[#656161] w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fill=""
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <strong className="mb-5 text-lg font-sans block font-semibold">
                {message}
              </strong>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white font-sans bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2"
                onClick={actionFunction}
              >
                Yes, I&apos;m sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 font-sans bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2.5 hover:text-gray-900 focus:z-10 "
                onClick={() => setShowConfirmationModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
