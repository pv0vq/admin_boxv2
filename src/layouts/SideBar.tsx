import { ReactNode, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
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
    if (menuState.includes(item.id)) {
      setMenuState((menuState) => [
        ...menuState.filter((sub) => sub !== item.id),
      ]);
    } else {
      setMenuState((menuState) => [...menuState, item.id]);
    }
  };

  return (
    <div className="static flex">
      <Card className="left-4 top-4 h-[calc(100vh-2rem)]  max-w-[20rem]  p-4  shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            biite
          </Typography>
        </div>
        <List>
          {manuList.map((manu, i) => {
            if (manu.child.length < 1) {
              return (
                <Link to={manu.path} key={i}>
                  <ListItem>
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {manu.label}
                  </ListItem>
                </Link>
              );
            } else {
              return (
                <Accordion
                  key={i}
                  open={menuState.includes(manu.id)}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        menuState.includes(manu.id) ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem
                    className="p-0"
                    selected={menuState.includes(manu.id)}
                  >
                    <AccordionHeader
                      onClick={() => menuStateHandler(manu)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        {manu.label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {manu.child.map((sub, ii) => {
                        if (menuState.includes(manu.id)) {
                          return (
                            <Link to={sub.path} key={ii}>
                              <ListItem>
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                {sub.label}
                              </ListItem>
                            </Link>
                          );
                        }
                      })}
                    </List>
                  </AccordionBody>
                </Accordion>
              );
            }
          })}
        </List>
      </Card>
      <div className="w-full p-4 sm:ml-64">{children}</div>
    </div>
  );
};

export default SideBar;
