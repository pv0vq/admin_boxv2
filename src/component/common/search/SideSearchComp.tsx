import { useEffect, useState } from "react";
import { IApi, IPageData, ISearchItem } from "../../../type/common";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import fetcher from "../../../api/fetcher";
import SimplePaginationComp from "../pagination/SimplePaginationComp";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import React from "react";
import utillFormat from "../../../utill/utillFormat";

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
  const { formatDateToyyyyMMdd, parseDateFromyyyyMMdd } = utillFormat();

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
    return (
      <div className="flex items-end justify-center gap-8">
        <div className="h-64 w-64">로딩중...</div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex">
          {searchState ? (
            <form className="p-4 shadow-xl shadow-blue-gray-900/5 rounded-lg">
              <button className="w-full" type="submit" onClick={onSubimt}>
                <div className="flex p-3 bg-violet-400 rounded-lg w-full border">
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
              </button>
              {searchItem.map((item: ISearchItem, index: number) => {
                if (item.type === "TEXT") {
                  return (
                    <div key={index}>
                      <div className="mb-2 flex items-center gap-4 p-4">
                        검색
                      </div>
                      <div className="p-3">
                        <div className="bg-white rounded-lg shadow-lg">
                          <input
                            type="text"
                            placeholder="Search"
                            onChange={(event: any) =>
                              paramsChangeHandler(
                                item.value,
                                event.target.value
                              )
                            }
                            value={params[item.value] || ""}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "DATE_PIKER") {
                  return (
                    <div key={index}>
                      <div className="mb-2 flex items-center gap-4 p-4">
                        {item.label}
                      </div>
                      <div className="p-3">
                        <div className="bg-white rounded-lg shadow-lg flex">
                          <DatePicker
                            locale={ko} // 언어설정 기본값은 영어
                            dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                            // minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                            closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                            placeholderText="날짜 선택" // placeholder
                            selected={
                              params[item.value]
                                ? parseDateFromyyyyMMdd(params[item.value])
                                : new Date()
                            } // value
                            onChange={(date: Date) =>
                              paramsChangeHandler(
                                item.value,
                                formatDateToyyyyMMdd(date)
                              )
                            } // 날짜를 선택하였을 때 실행될 함수
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "SELECT_BOX") {
                  if (item.optin && item.optin.length > 0) {
                    return (
                      <div key={index}>
                        <div className="mb-2 flex items-center gap-4 p-4">
                          {item.label}
                        </div>
                        <div className="p-2">
                          <div className="bg-white rounded-lg shadow-lg">
                            <select
                              className="form-select"
                              value={params[item.value]}
                              placeholder="선택"
                              onChange={(event: any) => {
                                paramsChangeHandler(
                                  item.value,
                                  event.target.value
                                );
                              }}
                            >
                              {item.optin.map((sub, ii) => {
                                return (
                                  <option key={ii} value={sub.value}>
                                    {sub.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  }
                } else if (item.type === "RADIO") {
                  if (item.optin && item.optin.length > 0) {
                    return (
                      <div key={index}>
                        <div className="mb-2 flex items-center gap-4 p-4">
                          {item.label}
                        </div>
                        <div className="p-3">
                          <div className="bg-white rounded-lg shadow-lg">
                            {item.optin.map((sub, ii) => {
                              return (
                                <div className="p-0" key={ii}>
                                  <label className="items-center cursor-pointer flex w-full px-3 py-2">
                                    <div className="mr-3">
                                      <input
                                        type="radio"
                                        name={item.value}
                                        id={item.value}
                                        checked={
                                          params[item.value] === sub.value
                                            ? true
                                            : false
                                        }
                                        onChange={(event: any) => {
                                          if (event.target.checked) {
                                            paramsChangeHandler(
                                              item.value,
                                              sub.value
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                    <div
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      {sub.label}
                                    </div>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                } else if (item.type === "CHECK_BOX") {
                  if (item.optin && item.optin.length > 0) {
                    return (
                      <div key={index}>
                        <div className="mb-2 flex items-center gap-4 p-4">
                          <div color="blue-gray">{item.label}</div>
                        </div>
                        <div className="p-3">
                          <div className="bg-white rounded-lg shadow-lg">
                            {item.optin.map((sub, ii) => {
                              return (
                                <div className="p-0" key={ii}>
                                  <label className="flex w-full cursor-pointer items-center px-3 py-2">
                                    <div className="mr-3">
                                      <input
                                        type="checkbox"
                                        id={sub.value}
                                        checked={
                                          Object.keys(params).includes(
                                            item.value
                                          ) &&
                                          params[item.value] !== "" &&
                                          params[item.value]
                                            .split(",")
                                            .includes(sub.value)
                                        }
                                        className="form-checkbox"
                                        onChange={(event: any) => {
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
                                            if (checkArr.includes(sub.value)) {
                                              const tremArr = checkArr.filter(
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
                                    </div>
                                    <div
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      {sub.label}
                                    </div>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                } else if (item.type === "SWITCH") {
                  return (
                    <div key={index}>
                      <div className="mb-2 flex items-center gap-4 p-4">
                        <div color="blue-gray">{item.label}</div>
                      </div>
                      <div className="p-3">
                        <div className="bg-white rounded-lg shadow-lg">
                          <div className="relative">
                            <label className="items-center cursor-pointer">
                              <input
                                type="checkbox"
                                id={item.value}
                                onChange={(event: any) => {
                                  if (event.target.checked) {
                                    paramsChangeHandler(item.value, "Y");
                                  } else {
                                    paramsChangeHandler(item.value, "N");
                                  }
                                }}
                                className="sr-only"
                              />
                              <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                              <div
                                className={
                                  params[item.value] === "Y"
                                    ? "absolute left-1 top-1 w-6 h-6 rounded-full transition translate-x-full bg-violet-400 "
                                    : "absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                                }
                              ></div>
                            </label>
                          </div>
                          {/* <label htmlFor={item.value} className="text-gray-700">
                            {item.value}
                          </label> */}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </form>
          ) : (
            <></>
          )}
          <div className="bg-white rounded-lg shadow-lg w-full h-full">
            <div className="bg-violet-500 text-white py-2 px-4 rounded-t-lg opacity-80">
              <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
                <div className="col-span-2">
                  <button onClick={searchStateHandelr}>검색하기</button>
                </div>
                <div className="col-span-2">{title}</div>
                <div className="col-span-1 text-right">
                  <p className="font-bold">총 {data?.totalElements} 건</p>
                </div>
              </div>
            </div>
            <div className="p-4">{React.cloneElement(children, { data })}</div>
            <div className="bg-gray-100 py-2 px-4 rounded-b-lg">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SideSearchComp;
