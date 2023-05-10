import Link from "next/link";

export default function Navbar({ navBar, setNavbar }) {
  return (
    <>
      <header className="grid grid-cols-3 gap-2.5 items-center sticky top-0  shadow z-[99] bg-[#ffffff] px-5 py-2 md:px-10 md:py-3">
        <div className="">
          <Link href="/">
            <h1 className="font-sans text-primary-color font-extrabold text-base min-[425px]:text-xl md:text-2xl drop-shadow-md shadow-blue-600/50">
              Intern Wolu
            </h1>
          </Link>
        </div>
        <nav className=" px-1.5 py-3 min-[499px]:w-full min-[499px]:justify-around min-[499px]:col-span-2">
          <ul
            className={`${
              navBar
                ? "absolute flex flex-col w-[50%] translate-y-8 right-0 items-center list-none text-sm max-[499px]:bg-slate-50 rounded-sm py-8 shadow transition-all"
                : "hidden"
            } gap-8 min-[499px]:justify-end min-[499px]:static min-[499px]:w-full min-[499px]:flex-row min-[499px]:text-sm min-[499px]:flex min-[499px]:py-0 min-[499px]:shadow-none md:text-base`}
          >
            <li className="inline-block text-center text-primary-color font-bold">
              <Link
                href="/"
                className="px-3 py-2 hover:text-blue-800 hover:bg-slate-100 hover:rounded-md focus:bg-slate-200 focus:rounded-md"
                onClick={() => setNavbar(!navBar)}
              >
                Home
              </Link>
            </li>
            <li className="inline-block text-center text-primary-color font-bold">
              <Link
                href="/student/profile"
                className="px-3 py-2 hover:text-blue-800 hover:bg-slate-100 hover:rounded-md focus:bg-slate-200 focus:rounded-md"
                onClick={() => setNavbar(!navBar)}
              >
                Profile
              </Link>
            </li>
            <li className="inline-block text-center text-primary-color font-bold">
              <Link
                href="/student/about"
                className="px-3 py-2 hover:text-blue-800 hover:bg-slate-100 hover:rounded-md focus:bg-slate-200 focus:rounded-md"
                onClick={() => setNavbar(!navBar)}
              >
                About us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid justify-items-end content-end min-[499px]:hidden">
          <button
            className={`p-2 text-primary-color rounded-md outline-none focus:border-gray-400 ${
              navBar && "bg-primary-color"
            }`}
            onClick={() => setNavbar(!navBar)}
          >
            {navBar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-primary-color"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
