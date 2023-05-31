export default function ErrorAlert(
 { showErrorAlert,
    setShowErrorAlert,
    errorMessage}
) {
  return (
    <>
      <div
        className={`fixed top-0 left-[50%] -translate-x-2/4 transition-transform duration-1000 -translate-y-full max-w-md min-w-[448px] min-h-[100px] px-4 pt-7 pb-4 mb-4 text-sm rounded-md bg-gray-800 text-red-400 ${
          showErrorAlert && "-translate-y-0"
        } `}
        role="alert"
      >
        <div className="flex w-full items-center">
          <svg
            className="flex-shrink-0 inline w-8 h-8 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              {errorMessage || 'Something went wrong, please try again'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <button className="bg-red-800 text-white px-2 py-1 rounded-md" onClick={()=>setShowErrorAlert(false)}>
            Okay
          </button>
        </div>
      </div>
    </>
  );
}
