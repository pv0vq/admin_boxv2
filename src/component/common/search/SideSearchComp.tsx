import { ReactNode, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Option,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { IOptions } from "../../../type/common";

interface ISearchItem {
  type: string;
  value: string;
  label: string;
  optin?: IOptions[];
}

const SideSearchComp = () => {
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

  return (
    <Card className="  p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        {searchItemLIst.map((item, index: number) => {
          if (item.type === "TEXT") {
            return (
              <div key={index}>
                <div className="mb-2 flex items-center gap-4 p-4">
                  <Typography variant="h5" color="blue-gray">
                    검색
                  </Typography>
                </div>
                <div className="p-2">
                  <Input
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    label="Search"
                  />
                </div>
              </div>
            );
          } else if (item.type === "SELECT_BOX") {
            if (item.optin && item.optin.length > 0) {
              return (
                <div key={index}>
                  <div className="mb-2 flex items-center gap-4 p-4">
                    <Typography variant="h5" color="blue-gray">
                      {item.label}
                    </Typography>
                  </div>
                  <div className="p-2">
                    <Select label={item.label}>
                      {item.optin.map((sub, ii) => {
                        return <Option key={ii}>{sub.label}</Option>;
                      })}
                    </Select>
                  </div>
                </div>
              );
            }
          } else if (item.type === "RADIO") {
            if (item.optin && item.optin.length > 0) {
              return (
                <div key={index}>
                  <div className="mb-2 flex items-center gap-4 p-4">
                    <Typography variant="h5" color="blue-gray">
                      {item.label}
                    </Typography>
                  </div>
                  <div className="p-2">
                    <Card>
                      <List>
                        {item.optin.map((sub, ii) => {
                          return (
                            <ListItem className="p-0" key={ii}>
                              <label
                                htmlFor="vertical-list-react"
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                              >
                                <ListItemPrefix className="mr-3">
                                  <Radio
                                    name="vertical-list"
                                    id="vertical-list-react"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                      className: "p-1",
                                    }}
                                  />
                                </ListItemPrefix>
                                <Typography
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {sub.label}
                                </Typography>
                              </label>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Card>
                  </div>
                </div>
              );
            }
          } else if (item.type === "CHECK_BOX") {
            if (item.optin && item.optin.length > 0) {
              return (
                <div key={index}>
                  <div className="mb-2 flex items-center gap-4 p-4">
                    <Typography variant="h5" color="blue-gray">
                      {item.label}
                    </Typography>
                  </div>
                  <div className="p-2">
                    <Card>
                      <List>
                        {item.optin.map((sub, ii) => {
                          return (
                            <ListItem className="p-0" key={ii}>
                              <label
                                htmlFor="vertical-list-react"
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                              >
                                <ListItemPrefix className="mr-3">
                                  <Checkbox
                                    id="vertical-list-react"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                      className: "p-1",
                                    }}
                                  />
                                </ListItemPrefix>
                                <Typography
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {sub.label}
                                </Typography>
                              </label>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Card>
                  </div>
                </div>
              );
            }
          } else if (item.type === "SWITCH") {
            return (
              <div key={index}>
                <div className="mb-2 flex items-center gap-4 p-4">
                  <Typography variant="h5" color="blue-gray">
                    {item.label}
                  </Typography>
                </div>
                <div className="p-3">
                  <Switch id="auto-update" label={item.label} />
                </div>
              </div>
            );
          }
        })}
      </List>
    </Card>
  );
};

export default SideSearchComp;
