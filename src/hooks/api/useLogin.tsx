import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import axios, { AxiosError, AxiosResponse } from "axios";
import fetcher from "../../api/fetcher";
import API_AUTH from "../../api/code/auth/auth";

// ** Defaults
// const defaultProvider: AuthValuesType = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   isInitialized: false,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve(),
//   setIsInitialized: () => Boolean,
//   refreshToken: () => null,
// };

interface IOptions {
  email: string;
  password: string;
}

export const fetchLogin = async (params: IOptions) =>
  await fetcher({ api: API_AUTH.LOGIN, options: params }).then(
    ({ data, headers }) => {
      return data;
    }
  );

function useLogin(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  // const queryClient = useQueryClient();
  // useSearchParams()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = queryString.parse(searchParams.toString());

  return useMutation(fetchLogin, {
    ...options,
    onSuccess: ({ path, success }) => {
      if (success) {
        localStorage.setItem("isLogin", success);
        return navigate(path as string);
      } else {
        toast.error("로그인 오류가 발생하였습니다.", { duration: 5000 });
      }
    },
    onError: (error: any) => {
      toast.error("로그인 오류가 발생하였습니다.", { duration: 5000 });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useLogin;
