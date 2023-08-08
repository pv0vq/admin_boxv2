import MenuListComp from "@src/component/layout/MenuListComp";
import useMenuList from "@src/hooks/api/menu/useMenuList";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface IMenu {
  id: number;
  menuName: string;
  path: string;
  parentId: number | null;
  children: IMenu[];
}

const SideBar = ({ children }: Props) => {
  const { data: manuList } = useMenuList();

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

  if (!manuList || manuList.length < 1) return <></>;

  return (
    <div className="flex">
      <div className="left-0 top-0 h-screen bg-violet-500 w-72 py-4 px-6 text-white rounded-lg opacity-80">
        <div className="text-3xl font-bold mb-4">biite</div>
        <ul className="space-y-2">
          {manuList.map((manu: IMenu, i) => {
            if (manu.children.length < 1) {
              return (
                <Link to={manu.path} key={i}>
                  <li className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                    <span className="text-lg ml-4 text-gray-200 font-bold">
                      {manu.menuName}
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
                      <span className="text-lg ml-4 text-gray-200 font-bold">
                        {manu.menuName}
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
                    className="text-left text-sm mt-2 w-5/6 mx-8 text-gray-200 font-bold"
                    id="submenu"
                  >
                    {menuState.includes(manu.id) ? (
                      <MenuListComp
                        setMenuState={menuStateHandler}
                        childMenuList={manu.children}
                        menuState={menuState}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </div>
      <div className="w-full ml-4 mr-4">{children}</div>
    </div>
  );
};

export default SideBar;
