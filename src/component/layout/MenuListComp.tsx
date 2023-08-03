import { Link } from "react-router-dom";

interface IProps {
  setMenuState: (menu: IMenu) => void;
  childMenuList: IMenu[];
  menuState: Array<number>;
}

interface IMenu {
  id: number;
  menuName: string;
  path: string;
  parentId: number | null;
  children: IMenu[];
}

const MenuListComp = ({ setMenuState, childMenuList, menuState }: IProps) => {
  return (
    <ul className="space-y-2">
      {childMenuList.map((manu: IMenu, i) => {
        if (manu.children.length < 1) {
          return (
            <Link to={manu.path} key={i}>
              <li className="p-3 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                <span className="text-[15px] ml-4 text-gray-200 font-bold m">
                  {manu.menuName}
                </span>
              </li>
            </Link>
          );
        } else {
          return (
            <div key={i}>
              <div
                className="p-3 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                onClick={() => setMenuState(manu)}
              >
                <div className="flex justify-between w-full items-center ">
                  <span className="text-[15px] ml-4 text-gray-200 font-bold">
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
                className="text-left text-sm mt-2 w-5/6 mx-10 text-gray-200 font-bold "
                id="submenu"
              >
                {menuState.includes(manu.id) ? (
                  <MenuListComp
                    setMenuState={setMenuState}
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
  );
};

export default MenuListComp;
