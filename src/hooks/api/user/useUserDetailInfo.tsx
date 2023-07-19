import { AxiosError, AxiosResponse } from "axios";
import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";
import fetcher from "../../../api/fetcher";
import API_USER from "../../../api/code/user";

interface IUserDetailInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  useYn: string;
  createDate: Date;
  modifiedDate: Date;
}

export interface IUserListParams {
  [key: string]: any;
}

// export const queryKeys = {
//   userInfo: "userInfo",
// };

export const QUERY_KEYS = Object.assign({
  // common
  USER_LIST: "userDetailInfo",
});

export const getUserDetailInfo = async (id: number) => {
  const { url, method } = API_USER.USER_DETAIL_INFO;
  return await fetcher({
    api: {
      url: url + id,
      method,
    },
  }).then(({ data }) => {
    return data.data;
  });
};

export default function useUserDetailInfo(
  id: number,
  options?: UseQueryOptions<
    AxiosResponse<IUserDetailInfo>,
    AxiosError,
    any,
    QueryKey[]
  >
): UseQueryResult<IUserDetailInfo, AxiosError> | undefined {
  if (id)
    return useQuery([QUERY_KEYS.USER_LIST, id], () => getUserDetailInfo(id), {
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    });
}
