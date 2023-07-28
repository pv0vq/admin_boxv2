import { AxiosError } from "axios";
import fetcher from "../../../../api/fetcher";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import API_COMMETN from "../../../../api/code/comment";

export interface IBoardListParams {
  [key: string]: any;
}

export const QUERY_KEYS = Object.assign({
  // common
  COMMENT_LIST: "comment_list",
});

/**
 *  게시판 조회 (페이징) API
 * @param params
 * @returns
 */
export const fetchCommentList = async (id: number) => {
  const { url, method } = API_COMMETN.COMMETN_LIST;
  if (id)
    return await fetcher({
      api: {
        url: url,
        method,
      },
      options: {
        boardId: id,
        page: 0,
        size: 10,
      },
    }).then(({ data }) => data.data);
};

export default function useCommentList(
  id: number
): UseQueryResult<any, AxiosError> {
  return useQuery([QUERY_KEYS.COMMENT_LIST, id], () => fetchCommentList(id), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
