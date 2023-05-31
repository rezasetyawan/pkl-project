import Link from "next/link";

export default function SideBarPR({ sidebar, setShowLogOutConfirmation }) {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 ${
        sidebar && "translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium text-sm">
          <li className="group">
            <Link
              href="/public-relation/"
              className="flex items-center p-2 text-sky-900 font-semibold rounded-lg  hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 fill-primary-color transition duration-75 group-hover:scale-105 font-semibold "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/public-relation/company-reference"
              className="flex items-center p-2 text-sky-900 font-semibold rounded-lg hover:bg-gray-100"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 fill-primary-color transition duration-75 group-hover:scale-105 font-semibold"
                fill="currentColor"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 3.33334C26.3181 3.33334 23.3334 6.3181 23.3334 10V40H16.6667C12.9848 40 10 42.9848 10 46.6667V66.6667L3.33337 66.6667V73.3333L16.6667 73.3333H23.3334H30H63.3334L76.6667 73.3333V66.6667L70 66.6667V10C70 6.3181 67.0153 3.33334 63.3334 3.33334H30ZM16.6667 53.3333H23.3334V60H16.6667V53.3333ZM43.3334 16.6667H36.6667V23.3333H43.3334V16.6667ZM56.6667 16.6667H50V23.3333H56.6667V16.6667ZM36.6667 28.3333H43.3334V35H36.6667V28.3333ZM56.6667 28.3333H50V35H56.6667V28.3333ZM50 40H56.6667V46.6667H50V40ZM56.6667 51.6667H50V58.3333H56.6667V51.6667Z"
                />
              </svg>

              <span className="flex-1 ml-3 whitespace-nowrap">
                Referensi Dudi
              </span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/public-relation/students"
              className="flex items-center p-2 text-sky-900 font-semibold rounded-lg hover:bg-gray-100"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 fill-primary-color transition duration-75 font-semibold group-hover:scale-105"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                Daftar Murid
              </span>
            </Link>
          </li>
          <li className="group">
            <Link
              href="/public-relation/dudi"
              className="flex items-center p-2 text-sky-900 font-semibold rounded-lg hover:bg-gray-100"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 fill-primary-color transition duration-75 font-semibold group-hover:scale-105"
                fill="currentColor"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Daftar Dudi</span>
            </Link>
          </li>
          <li className="group">
            <button
              className="flex items-center p-2 text-sky-900 font-semibold rounded-lg hover:bg-gray-100 pr-[120px]"
              onClick={() => setShowLogOutConfirmation(true)}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 fill-primary-color transition duration-75  group-hover:scale-105 font-semibold "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
