import Link from "next/link";

export default function NavbarPR({ sidebar, setSidebar }) {
  return (
    <>
      <header>
        <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
          <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                  onClick={() => {
                    setSidebar(!sidebar);
                    console.log(sidebar);
                  }}
                >
                  <span class="sr-only">Open sidebar</span>
                  <svg
                    class="w-6 h-6"
                    fill="#0066ff"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <Link href="/public-relation/" class="flex ml-2 md:mr-24">
                  <h1 className="font-sans text-primary-color font-extrabold text-base min-[425px]:text-xl md:text-2xl drop-shadow-md shadow-blue-600/50">
                    Intern Wolu
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
