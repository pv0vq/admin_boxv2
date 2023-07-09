// import { AxiosError } from "axios";
// import API_BOARD from "../../../../api/code/board";
// import fetcher from "../../../../api/fetcher";
// import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

// interface IBoarInfo {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
// }

// export interface IBoardListParams {
//   [key: string]: any;
// }

// // export const queryKeys = {
// //   userInfo: "userInfo",
// // };

// export const QUERY_KEYS = Object.assign({
//   // common
//   BOARD_LIST: "board_list",
// });

// /**
//  *  게시판 조회 (페이징) API
//  * @param params
//  * @returns
//  */
// export const getBoardList = async (params?: IBoardListParams) => {
//   return await fetcher({
//     api: API_BOARD.FREE_BOARD_LIST,
//     options: params,
//   }).then(({ data }) => data.data);
// };

// export default function useFreeBoardList(
//   params?: IBoardListParams,
//   options?: UseQueryOptions<any, AxiosError>
// ): UseQueryResult<any, AxiosError> {
//   return useQuery([QUERY_KEYS.BOARD_LIST, params], () => getBoardList(params), {
//     enabled: !!params,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//   });
// }
