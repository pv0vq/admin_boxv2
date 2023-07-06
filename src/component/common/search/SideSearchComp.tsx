import { ReactNode, memo, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Option,
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ISearchItem } from "../../../type/common";
import React from "react";
import useFreeBoardList from "../../../hooks/api/board/freeBoard/useFreeBoardList";

interface IProps {
  searchItem: ISearchItem[];
  children: any;
}

const SideSearchComp = ({ searchItem, children }: IProps) => {
  const [params, setParams] = useState<any>({});
  const [submit, setSubmit] = useState<any>({});
  const { data, isLoading } = useFreeBoardList(submit);
  const [searchState, setSearchState] = useState<boolean>(false);

  /**
   * 검색 파라미터 업데이트
   *
   * @param name key
   * @param value value
   */
  const paramsChangeHandler = (name: any, value: any) => {
    setParams((prevParams: any) => {
      return { ...prevParams, [name]: value };
    });
  };

  const onSubimt = () => {
    setSubmit(params);
  };

  return (
    <>
      <Tooltip content="검색창">
        <Button onClick={() => setSearchState(!searchState)}>검색하기</Button>
      </Tooltip>
      <div className="flex">
        {searchState ? (
          <Card className="  p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
              <Button color="light-green" size="lg" onClick={onSubimt}>
                <div className="flex p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <div className="translate-x-1/2">조회하기</div>
                </div>
              </Button>
              {searchItem.map((item: ISearchItem, index: number) => {
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
                          onChange={(event: any) =>
                            paramsChangeHandler(item.value, event.target.value)
                          }
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
                          <Select
                            label={item.label}
                            onChange={(event: any) => {
                              paramsChangeHandler(item.value, event);
                            }}
                          >
                            {item.optin.map((sub, ii) => {
                              return (
                                <Option key={ii} value={sub.value}>
                                  {sub.label}
                                </Option>
                              );
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
                                          name={item.value}
                                          id={item.value}
                                          ripple={false}
                                          className="hover:before:opacity-0"
                                          containerProps={{
                                            className: "p-1",
                                          }}
                                          onChange={(event) => {
                                            if (event.target.checked) {
                                              paramsChangeHandler(
                                                item.value,
                                                sub.value
                                              );
                                            }
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
                                          id={sub.value}
                                          ripple={false}
                                          className="hover:before:opacity-0"
                                          containerProps={{
                                            className: "p-1",
                                          }}
                                          onChange={(event) => {
                                            if (
                                              Object.keys(params).includes(
                                                item.value
                                              )
                                            ) {
                                              const checkArr: Array<string> =
                                                params[item.value];
                                              if (
                                                checkArr.includes(sub.value)
                                              ) {
                                                paramsChangeHandler(
                                                  item.value,
                                                  checkArr.filter(
                                                    (arr: string) =>
                                                      arr !== sub.value
                                                  )
                                                );
                                              } else {
                                                checkArr.push(sub.value);
                                                paramsChangeHandler(
                                                  item.value,
                                                  checkArr
                                                );
                                              }
                                            } else {
                                              if (event.target.checked) {
                                                paramsChangeHandler(
                                                  item.value,
                                                  [sub.value]
                                                );
                                              }
                                            }
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
                        <Switch
                          id={item.value}
                          label={item.label}
                          onChange={(event: any) => {
                            if (event.target.checked) {
                              paramsChangeHandler(item.value, "Y");
                            } else {
                              paramsChangeHandler(item.value, "N");
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </List>
          </Card>
        ) : (
          <></>
        )}

        {React.cloneElement(children, { data })}
      </div>
    </>
  );
};

export default SideSearchComp;
