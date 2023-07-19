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
        { id: 4, label: "자유게시판", path: "/freeBoard", upperId: 2 },
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
    if (menuState.includes(item.id)) {
      setMenuState((menuState) => [
        ...menuState.filter((sub) => sub !== item.id),
      ]);
    } else {
      setMenuState((menuState) => [...menuState, item.id]);
    }
  };

  return (
    <div className="flex">
      <div className="left-0 top-0 h-screen bg-violet-500 w-64 py-4 px-6 text-white rounded-lg opacity-80">
        <div className="text-3xl font-bold mb-4">biite</div>
        <ul className="space-y-2">
          {manuList.map((manu, i) => {
            if (manu.child.length < 1) {
              return (
                <Link to={manu.path} key={i}>
                  <li className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">
                      {manu.label}
                    </span>
                  </li>
                </Link>
              );
            } else {
              return (
                <div key={i}>
                  <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={() => menuStateHandler(manu)}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="text-[15px] ml-4 text-gray-200 font-bold">
                        {manu.label}
                      </span>
                      <svg
                        className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-white group-hover:text-gray-500 dark:text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                    id="submenu"
                  >
                    {manu.child.map((sub, ii) => {
                      if (menuState.includes(manu.id)) {
                        return (
                          <Link to={sub.path} key={ii}>
                            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                              {sub.label}
                            </h1>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </div>
      <div className="w-full ml-4">{children}</div>
    </div>
  );
};

export default SideBar;
