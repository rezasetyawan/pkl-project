export default function Error({errorMessage, errorCode}) {
    return (
      <div className="text-center">
        <div
          role="status"
          className="absolute top-[10%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:top-[33%]"
        >
          <strong className={`text-lg font-bold ${errorCode !== '404' && 'text-red-600'}`}>{errorMessage}</strong>
        </div>
      </div>
    );
  }
  