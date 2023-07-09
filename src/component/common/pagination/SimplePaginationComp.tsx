import {
  Button,
  IconButton,
  Select,
  Option,
  ButtonGroup,
} from "@material-tailwind/react";
import { IOptions } from "../../../type/common";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface IProps {
  setPageUpdate: (page: number) => void;
  setPageSizeUpdate: (size: number) => void;
  page: number;
  limit: number;
  totalPage: number;
  size: string;
}

const SimplePaginationComp = ({
  page,
  limit,
  totalPage,
  size,
  setPageUpdate,
  setPageSizeUpdate,
}: IProps) => {
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [pageSize] = useState([
    {
      label: "10",
      value: "10",
    },
    {
      label: "25",
      value: "25",
    },
    {
      label: "50",
      value: "50",
    },
    {
      label: "100",
      value: "100",
    },
  ]);

  /**
   * 토탈 페이징 배열 만들기
   * [[1,2,3,4,5]. [6,7,8,9,10],[11]]
   *
   */
  useEffect(() => {
    console.log(sliceArrayByLimit(totalPage, limit));
    setTotalPageArray(sliceArrayByLimit(totalPage, limit));
  }, [totalPage]);

  useEffect(() => {
    if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    } else {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    }
  }, [page, totalPageArray]);

  /**
   * 토탈 페이징 2차원 배열 만들기
   *
   * @param totalPage 11
   * @param limit 5
   * @returns
   */
  const sliceArrayByLimit = (totalPage: number, limit: number) => {
    const arr = [];
    const result = [];
    /**
     * 토탈 페이징 1차원 배열
     */
    for (let i = 1; i <= totalPage; i++) {
      arr.push(i);
    }

    /**
     * limit 만큼 짜른 2차원 배열 파싱 0, 5, 10
     */
    for (let i = 0; i < arr.length; i += limit) {
      result.push(arr.slice(i, i + limit));
    }
    return result;
  };

  /**
   * 클릭 시
   *
   * @param index
   */
  const getItemProps = (index: number) => {
    setPageUpdate(index - 1);
  };

  /**
   * 다음버튼
   *
   * @returns setPageUpdate(page)
   */
  const next = () => {
    if (page === totalPage) return;
    else setPageUpdate(page);
  };

  /**
   * 이전 버튼
   *
   * @returns setPageUpdate(page - 2)
   */
  const prev = () => {
    if (page === 1) return;
    else setPageUpdate(page - 2);
  };

  return (
    <div className="flex justify-between">
      <div>
        <Select
          label="사이즈"
          value={String(size)}
          onChange={(event: any) => {
            setPageSizeUpdate(event);
            console.log(event);
          }}
        >
          {pageSize.map((size, i) => {
            return (
              <Option key={size.value} value={size.value}>
                {size.label}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="flex p-2">
        <ButtonGroup variant="outlined" color="blue-gray">
          <IconButton onClick={prev}>
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          {currentPageArray ? (
            currentPageArray.map((curPage, i) => {
              return (
                <IconButton
                  className={
                    curPage === page
                      ? "bg-blue-gray-100 text-blue-gray-900"
                      : ""
                  }
                  key={i}
                  onClick={() => getItemProps(curPage)}
                >
                  {curPage}
                </IconButton>
              );
            })
          ) : (
            <></>
          )}
          <IconButton onClick={next}>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default SimplePaginationComp;
