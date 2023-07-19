import { useEffect, useState } from "react";

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
        <select
          value={String(size)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(event: any) => {
            setPageSizeUpdate(event.target.value);
          }}
        >
          {pageSize.map((size, i) => {
            return (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex p-2">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={prev}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100  focus:ring-blue-700 focus:text-blue-700 "
          >
            prev
          </button>
          {currentPageArray ? (
            currentPageArray.map((curPage, i) => {
              return (
                <button
                  type="button"
                  className={
                    curPage === page
                      ? "px-4 py-2 text-sm font-medium  border-t border-b border-gray-200 hover:bg-gray-100 focus:ring-blue-700 focus:text-blue-700 bg-blue-gray-100 text-blue-gray-900"
                      : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 focus:ring-blue-700 focus:text-blue-700"
                  }
                  key={i}
                  onClick={() => getItemProps(curPage)}
                >
                  {curPage}
                </button>
              );
            })
          ) : (
            <></>
          )}
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100  focus:ring-blue-700 focus:text-blue-700"
            onClick={next}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimplePaginationComp;
