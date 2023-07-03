import { AxiosError, AxiosResponse } from "axios";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";
import fetcher from "../../api/fetcher";
import API_AUTH from "../../api/code/auth";

interface IOptions {
  email: string;
  password: string;
}

export const queryKeys = {
  login: "login",
};

export const fetchLogin = async (options: IOptions) =>
  await fetcher({ api: API_AUTH.LOGIN, options }).then(({ data }) => data);

function useLogin(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  return useMutation(fetchLogin, {
    ...options,
    onSuccess: (data, variables, context) => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
}

export default useLogin;
