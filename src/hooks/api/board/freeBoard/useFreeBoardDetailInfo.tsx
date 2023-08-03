import { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import API_BOARD from "../../../../api/code/board/freeBoard/board";
import fetcher from "../../../../api/fetcher";

interface IBoardDetailInfo {
  id: number;
  title: string;
  content: string;
  useYn: string;
  createDate: Date;
  modifiedDate: Date;
  creatorName: string;
  creatorEmail: string;
}

export const QUERY_KEYS = Object.assign({
  // common
  BOARD_DETAIL: "boardDetailInfo",
});

export const fetchBoardDetailInfo = async (id: number) => {
  const { url, method } = API_BOARD.FREE_BOARD_DETAIL;
  if (id)
    return await fetcher({
      api: {
        url: url + id,
        method,
      },
    }).then(({ data }) => {
      return data.data;
    });
};

export const useFreeBoardDetailInfo = (
  id: number
): UseQueryResult<IBoardDetailInfo, AxiosError> => {
  return useQuery(
    [QUERY_KEYS.BOARD_DETAIL, id],
    () => fetchBoardDetailInfo(id),
    {
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    }
  );
};
