import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const SideBar = ({ children }: Props) => {
  const manuList = [
    {
      id: 1,
      label: "Dashboard",
      path: "/main",
      child: [],
    },
    {
      id: 2,
      label: "게시판",
      path: "#",
      child: [
        { id: 4, label: "자유게시판", path: "/board", upperId: 2 },
        { id: 5, label: "공지사항", path: "/notice", upperId: 2 },
        { id: 6, label: "1대1문의", path: "/qna", upperId: 2 },
      ],
    },
    {
      id: 3,
      label: "유저",
      path: "/user",
      child: [],
    },
    {
      id: 7,
      label: "코드",
      path: "#",
      child: [
        { id: 8, label: "제조사 관리", path: "/vendor", upperId: 7 },
        { id: 9, label: "코드 관리", path: "/code", upperId: 7 },
      ],
    },
  ];

  const [menuState, setMenuState] = useState<Array<number>>([]);

  const menuStateHandler = (item: any) => {
    console.log(111);
    if (menuState.includes(item.id)) {
      setMenuState((menuState) => [
        ...menuState.filter((sub) => sub !== item.id),
      ]);
    } else {
      setMenuState((menuState) => [...menuState, item.id]);
    }
  };

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {manuList.map((manu, i) => {
              if (manu.child.length < 1) {
                return (
                  <li key={i}>
                    <Link
                      to={manu.path}
                      className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <span className="ml-3">{manu.label}</span>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <div key={i}>
                    <button
                      type="button"
                      className="group flex w-full items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      onClick={() => menuStateHandler(manu)}
                    >
                      <span className="ml-3 flex-1 whitespace-nowrap text-left">
                        {manu.label}
                      </span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <ul className="space-y-2 font-medium">
                      {manu.child.map((sub, ii) => {
                        if (menuState.includes(manu.id)) {
                          console.log("나?");
                          return (
                            <li key={ii}>
                              <Link
                                to={sub.path}
                                className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                );
              }
            })}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
};

export default SideBar;
