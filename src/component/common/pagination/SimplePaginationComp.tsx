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
  data: IPageData;
  setPageUpdate: (page: number) => void;
}
const SimplePaginationComp = React.memo(({ data, setPageUpdate }: IProps) => {
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

  const [pageCount, setPageCount] = useState(1);

  const getItemProps = (index: number) => {
    setPageUpdate(index - 1);
  };

  const next = () => {
    if (data.number === pageCount * 10 - 1) {
      setPageCount(pageCount + 1);
    }
    setPageUpdate(data.number + 1);
  };

  const prev = () => {
    if (data.number === pageCount - 1) {
      if (pageCount === 1) {
        return;
      } else {
        setPageCount(pageCount - 1);
      }
    }
    setPageUpdate(data.number - 1);
  };

  const pagingList = () => {
    const result = [];
    console.log(pageCount * 10 - 9, "아냐?");
    for (let i = pageCount * 10 - 9; i <= pageCount * 10; i++) {
      result.push(
        <IconButton
          className={
            i === data.number + 1 ? "bg-blue-gray-100 text-blue-gray-900" : ""
          }
          key={i}
          onClick={() => getItemProps(i)}
        >
          {i}
        </IconButton>
      );
    }
    return result;
  };

  // const pagingList = useMemo(() => {
  //   const result = [];
  //   for (let i = pageCount * 10 - 9; i <= pageCount * 10; i++) {
  //     result.push(
  //       <IconButton
  //         className={
  //           i === data.number + 1 ? "bg-blue-gray-100 text-blue-gray-900" : ""
  //         }
  //         key={i}
  //         onClick={() => getItemProps(i)}
  //       >
  //         {i}
  //       </IconButton>
  //     );
  //   }
  //   return result;
  // }, [pageCount]);

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
          {pagingList()}
          <IconButton onClick={next}>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
});

export default SimplePaginationComp;
