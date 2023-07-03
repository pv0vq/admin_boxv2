import { AxiosError, AxiosResponse } from "axios";
import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";
import fetcher from "../../api/fetcher";
import API_USER from "../../api/code/user";

interface IUserInfo {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

export const queryKeys = {
  userInfo: "userInfo",
};

function useUserList(
  options?: UseQueryOptions<
    AxiosResponse<IUserInfo[]>,
    AxiosError,
    any,
    QueryKey[]
  >
): UseQueryResult<IUserInfo[], AxiosError> {
  const getUserList = async () =>
    await fetcher({ api: API_USER.USER_LIST }).then(({ data }) => data);

  return useQuery([queryKeys.userInfo], () => getUserList());
}

export default useUserList;
