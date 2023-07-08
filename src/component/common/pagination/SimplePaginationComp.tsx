import {
  Button,
  IconButton,
  Select,
  Option,
  ButtonGroup,
} from "@material-tailwind/react";
import { IPageData } from "../../../type/common";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";

interface IProps {
  setPageUpdate: (page: number) => void;
  page: number;
  limit: number;
  totalPage: number;
}

const SimplePaginationComp = ({
  page,
  limit,
  totalPage,
  setPageUpdate,
}: IProps) => {
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

  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    console.log(sliceArrayByLimit(totalPage, limit));
    setTotalPageArray(sliceArrayByLimit(totalPage, limit));
  }, [totalPage]);

  useEffect(() => {
    console.log(
      "(page % limit === 1",
      page % limit,
      "totalPageArray[Math.floor(page / limit):"
    );

    const curArr = totalPageArray[Math.floor(page / limit)];
    if (curArr) {
      if (page % limit === 1) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
      } else {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
      }
    }
  }, [totalPageArray]);

  const sliceArrayByLimit = (totalPage: number, limit: number) => {
    const arr = [];
    const result = [];
    for (let i = 1; i <= totalPage; i++) {
      arr.push(i);
    }

    for (let i = 0; i < arr.length; i += limit) {
      result.push(arr.slice(i, i + limit));
    }
    return result;
  };

  const getItemProps = (index: number) => {
    setPageUpdate(index - 1);
  };

  const next = () => {
    // if (data.number === pageCount * 10 - 1) {
    //   setPageCount(pageCount + 1);
    // }
    setPageUpdate(page + 1);
  };

  const prev = () => {
    // if (data.number === pageCount - 1) {
    //   if (pageCount === 1) {
    //     return;
    //   } else {
    //     setPageCount(pageCount - 1);
    //   }
    // }
    setPageUpdate(page - 1);
  };

  // const pagingList = () => {
  //   currentPageArray;
  //   const result = [];
  //   for (let i = pageCount * 10 - 9; i <= pageCount * 10; i++) {
  //     result.push();
  //   }
  //   return result;
  // };

  return (
    <div className="flex justify-between">
      <div>
        <Select
          label="사이즈"
          defaultValue={pageSize[0].value}
          onChange={(event: any) => {
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
