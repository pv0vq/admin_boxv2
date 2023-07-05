import {
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Navbar,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { ReactNode, useState } from "react";
import { IOptions } from "../../../type/common";
import SideSearchComp from "./SideSearchComp";
interface IProps {
  children: ReactNode;
}

interface ISearchItem {
  type: string;
  value: string;
  label: string;
  optin?: IOptions[];
}

const SimpleSearchComp = ({ children }: IProps) => {
  const [searchItemLIst] = useState<ISearchItem[]>([
    {
      type: "TEXT",
      value: "userName",
      label: "검색",
    },
    {
      type: "SELECT_BOX",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "RADIO",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "CHECK_BOX",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "SWITCH",
      value: "useYn",
      label: "사용여부",
    },
  ]);

  const [searchState, setSearchState] = useState<boolean>(false);

  return (
    <div className="flex">
      {searchState ? <SideSearchComp /> : <></>}
      <Card className="h-full w-full overflow-scroll">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Tooltip content="검색창">
            <Button onClick={() => setSearchState(!searchState)}>검색</Button>
          </Tooltip>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default SimpleSearchComp;
