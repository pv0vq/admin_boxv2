// import { AxiosError, AxiosResponse } from "axios";
// import {
//   QueryKey,
//   UseQueryOptions,
//   UseQueryResult,
//   useQuery,
// } from "react-query";
// import fetcher from "../../../api/fetcher";
// import API_USER from "../../../api/code/user";

// interface IUserInfo {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
// }

// export interface IUserListParams {
//   [key: string]: any;
// }

// // export const queryKeys = {
// //   userInfo: "userInfo",
// // };

// export const QUERY_KEYS = Object.assign({
//   // common
//   USER_LIST: "userInfo",
// });

// export const getUserList = async () => {
//   return await fetcher({ api: API_USER.USER_LIST }).then(
//     ({ data }) => data.data
//   );
// };

// export default function useUserList(
//   options?: UseQueryOptions<any, AxiosError>
// ): UseQueryResult<any, AxiosError> {
//   return useQuery(QUERY_KEYS.USER_LIST, () => getUserList(), options);
// }
