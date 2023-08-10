import { useState } from "react";

const HeadBar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-purple-500 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <h2 className="text-2xl font-bold text-white">LOGO</h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
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
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Blog</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">About US</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="javascript:void(0)">Contact US</a>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <a
                href="javascript:void(0)"
                className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </a>
              <a
                href="javascript:void(0)"
                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <a
            href="javascript:void(0)"
            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
          >
            Sign in
          </a>
          <a
            href="javascript:void(0)"
            className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
  // return (
  //   <nav classNameName="bg-white border-gray-200 dark:bg-gray-900 ">
  //     <div classNameName="flex flex-wrap items-center justify-end mx-auto p-4">
  //       <div classNameName="flex items-center md:order-2">
  //         <button
  //           type="button"
  //           classNameName="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
  //           id="user-menu-button"
  //           aria-expanded="false"
  //           data-dropdown-toggle="user-dropdown"
  //           data-dropdown-placement="bottom"
  //         >
  //           <img
  //             src="https://flowbite.com/docs/images/logo.svg"
  //             classNameName="h-8 mr-3"
  //             alt="Flowbite Logo"
  //           />
  //           <span classNameName="sr-only">Open user menu</span>
  //         </button>
  //         <div
  //           classNameName="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
  //           id="user-dropdown"
  //         >
  //           <div classNameName="px-4 py-3">
  //             <span classNameName="block text-sm text-gray-900 dark:text-white">
  //               Bonnie Green
  //             </span>
  //             <span classNameName="block text-sm  text-gray-500 truncate dark:text-gray-400">
  //               name@flowbite.com
  //             </span>
  //           </div>
  //           <ul classNameName="py-2 ">
  //             <li>
  //               <a
  //                 href="#"
  //                 classNameName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
  //               >
  //                 Dashboard
  //               </a>
  //             </li>
  //             <li>
  //               <a
  //                 href="#"
  //                 classNameName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
  //               >
  //                 Settings
  //               </a>
  //             </li>
  //             <li>
  //               <a
  //                 href="#"
  //                 classNameName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
  //               >
  //                 Earnings
  //               </a>
  //             </li>
  //             <li>
  //               <a
  //                 href="#"
  //                 classNameName="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
  //               >
  //                 Sign out
  //               </a>
  //             </li>
  //           </ul>
  //         </div>
  //         <button
  //           data-collapse-toggle="navbar-user"
  //           type="button"
  //           classNameName="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  //           aria-controls="navbar-user"
  //           aria-expanded="false"
  //         >
  //           <span classNameName="sr-only">Open main menu</span>
  //           <svg
  //             classNameName="w-5 h-5"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 17 14"
  //           >
  //             <path
  //               stroke="currentColor"
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               stroke-width="2"
  //               d="M1 1h15M1 7h15M1 13h15"
  //             />
  //           </svg>
  //         </button>
  //       </div>
  //     </div>
  //   </nav>
  // );
};
export default HeadBar;
