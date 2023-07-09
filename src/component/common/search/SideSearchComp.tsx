import { useEffect, useState } from "react";
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
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IApi, IPageData, ISearchItem } from "../../../type/common";
import React from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import fetcher from "../../../api/fetcher";
import SimplePaginationComp from "../pagination/SimplePaginationComp";

interface IProps {
  searchItem: ISearchItem[];
  children: any;
  title: string;
  api: IApi;
}

interface ISearchParams {
  [key: string]: any;
}

export const QUERY_KEYS = Object.assign({
  // qur
  SEARCH_PAGE: "searchPage",
});

const SideSearchComp = ({ searchItem, children, title, api }: IProps) => {
  const [params, setParams] = useState<ISearchParams>({});
  const [submit, setSubmit] = useState<ISearchParams>({
    page: 0,
    size: 10,
  });
  const [totalPage, setTotalPag] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState(10);

  /**
   * react query 서치
   *
   */
  const { data, isLoading, refetch } = useQuery<IPageData, AxiosError>(
    [QUERY_KEYS.SEARCH_PAGE, submit, api],
    () => getSearchPage(),
    {
      enabled: !!submit,
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    }
  );

  /**
   * 서치 api
   *
   * @returns
   */
  const getSearchPage = async () => {
    return await fetcher({ api, options: submit }).then(
      ({ data }) => data.data
    );
  };

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

  /**
   * 검색하기
   *
   */
  const onSubimt = () => {
    setSubmit(params);
  };

  /**
   * 검색창 핸들러
   *
   */
  const searchStateHandelr = () => {
    // 검색 파라미터 초기화
    setParams({});
    setSearchState(!searchState);
  };

  /**
   * 페이지 이동
   *
   * @param page
   */
  const setPageUpdateHandler = (page: number) => {
    setSubmit({ ...submit, page });
  };

  /**
   * 페이지 사이즈 업데이트
   *
   * @param size
   */
  const setPageSizeUpdate = (size: number) => {
    setSize(size);
    setSubmit({ size });
  };

  useEffect(() => {
    if (data) {
      setPage(data.pageable.pageNumber + 1);
      setTotalPag(data.totalPages);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("params:", params);
  // }, [params]);

  if (isLoading) {
    <div className="flex items-end justify-center gap-8">
      <Spinner className="h-64 w-64" />
    </div>;
  } else {
    return (
      <div>
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
                              paramsChangeHandler(
                                item.value,
                                event.target.value
                              )
                            }
                            value={params[item.value]}
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
                              value={params[item.value]}
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
                                            checked={
                                              params[item.value] === sub.value
                                                ? true
                                                : false
                                            }
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
                                            checked={
                                              Object.keys(params).includes(
                                                item.value
                                              ) &&
                                              params[item.value] !== "" &&
                                              params[item.value]
                                                .split(",")
                                                .includes(sub.value)
                                            }
                                            containerProps={{
                                              className: "p-1",
                                            }}
                                            onChange={(event) => {
                                              // param에 값이 있고 빈값이 아닐 경우
                                              if (
                                                Object.keys(params).includes(
                                                  item.value
                                                ) &&
                                                params[item.value] !== ""
                                              ) {
                                                const checkArr: Array<string> =
                                                  params[item.value].split(",");
                                                // param에 기존 값이 있으면 삭제
                                                if (
                                                  checkArr.includes(sub.value)
                                                ) {
                                                  const tremArr =
                                                    checkArr.filter(
                                                      (arr: string) =>
                                                        arr !== sub.value
                                                    );
                                                  paramsChangeHandler(
                                                    item.value,
                                                    tremArr.join(",")
                                                  );
                                                } else {
                                                  // 없으면 추가
                                                  checkArr.push(sub.value);
                                                  if (checkArr.length === 1) {
                                                    paramsChangeHandler(
                                                      item.value,
                                                      checkArr[0]
                                                    );
                                                  } else {
                                                    paramsChangeHandler(
                                                      item.value,
                                                      checkArr.join(",")
                                                    );
                                                  }
                                                }
                                              } else {
                                                // param에 값이 없으니 추가
                                                if (event.target.checked) {
                                                  paramsChangeHandler(
                                                    item.value,
                                                    sub.value
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
          <Card className="h-full w-full">
            <CardHeader
              floated={false}
              shadow={false}
              className="flex-row rounded-none"
            >
              <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
                <div className="col-span-2">
                  <Tooltip content="검색창">
                    <Button onClick={searchStateHandelr}>검색하기</Button>
                  </Tooltip>
                </div>
                <Typography variant="h2" className="col-span-2">
                  {title}
                </Typography>
                <div className="col-span-1 text-right">
                  <p className="font-bold">총 {data?.totalElements} 건</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-0 ">
              {React.cloneElement(children, { data })}
            </CardBody>
            <CardFooter>
              {/* 페이징 */}
              {data && data.content.length > 0 ? (
                <SimplePaginationComp
                  totalPage={totalPage}
                  limit={5}
                  page={page}
                  size={String(size)}
                  setPageSizeUpdate={setPageSizeUpdate}
                  setPageUpdate={setPageUpdateHandler}
                />
              ) : (
                <></>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
};

export default SideSearchComp;
