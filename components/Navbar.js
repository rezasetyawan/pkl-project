import Link from "next/link";

export default function Navbar({navBar, setNavbar}) {

  return (
    <>
      <header className="grid grid-cols-3 gap-2.5 items-center sticky top-0  shadow z-[99] bg-[#ffffff] px-5 py-2 md:px-10 md:py-3">
        <div>
          <Link href="/">
            <h2 className="font-work-sans text-primary-color font-bold tracking-tighter text-sm md:text-2xl">
              PROJECT PKL
            </h2>
          </Link>
        </div>
        <nav className=" px-1.5 py-3 min-[499px]:w-full min-[499px]:justify-around min-[499px]:col-span-2">
          <ul className={`${navBar ? 'absolute flex flex-col w-[50%] top-[58px] right-0 items-center list-none text-xs bg-[#ffffff] py-5 shadow' : 'hidden'} gap-8 min-[499px]:justify-end min-[499px]:static min-[499px]:w-full min-[499px]:flex-row min-[499px]:text-sm min-[499px]:flex min-[499px]:py-0 min-[499px]:shadow-none`}>
            <li className="inline-block text-center text-primary-color font-bold">
              <Link href="/" onClick={() => setNavbar(!navBar)}>Home</Link>
            </li>
            <li className="inline-block text-center text-primary-color font-bold">
              <Link href="/account" onClick={() => setNavbar(!navBar)}>Account</Link>
            </li>
            <li className="inline-block text-center text-primary-color font-bold">
              <Link href="/about" onClick={() => setNavbar(!navBar)}>About us</Link>
            </li>
          </ul>
        </nav>
        <div className="grid justify-items-end content-end min-[499px]:hidden">
          <button
            className="p-2 text-primary-color rounded-md outline-none focus:border-gray-400"
            onClick={() => setNavbar(!navBar)}
          >
            {navBar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-primary-color"
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
      {/* <nav className="w-full bg-slate-50 shadow">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link href="/"><h2 className="text-2xl font-work-sans text-primary-color font-bold tracking-tighter">PROJECT PKL</h2></Link>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-primary-color rounded-md outline-none focus:border-gray-400 focus:border"
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
                                            className="w-6 h-6 text-white"
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
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navBar ? 'block' : 'hidden'
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="text-primary-color font-bold">
                                    <Link href="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="text-primary-color font-bold">
                                    <Link href="/blogs">
                                        Account
                                    </Link>
                                </li>
                                <li className="text-primary-color font-bold">
                                    <Link href="/about">
                                        About US
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav> */}
    </>
  );
}
