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
import { IOptions, ISearchItem } from "../../../type/common";
import SideSearchComp from "./SideSearchComp";
interface IProps {
  children: ReactNode;
  searchItem: ISearchItem[];
  title: string;
}

const SimpleSearchComp = ({ children, searchItem, title }: IProps) => {
  const [searchState, setSearchState] = useState<boolean>(false);

  return (
    <div className="flex">
      {searchState ? <SideSearchComp searchItem={searchItem} /> : <></>}
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex-row rounded-none"
        >
          <div className="flex flex-wrap items-center text-blue-gray-900 relative py-2 p-4">
            <Tooltip content="검색창">
              <Button onClick={() => setSearchState(!searchState)}>
                검색하기
              </Button>
            </Tooltip>
            <Typography variant="h2" className="absolute left-1/2 ">
              {title}
            </Typography>
          </div>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default SimpleSearchComp;
