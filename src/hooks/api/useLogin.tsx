import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { Cookies } from "react-cookie";
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
    ({ data }) => data
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
    onSuccess: ({ data, status, success, message }) => {
      if (status === "OK") {
        const { accessToken, refreshToken } = data;
        // 이전 페이지 정보가 있을 경우
        const returnUrl = query.returnUrl;
        const redirectURL =
          returnUrl && returnUrl !== "/" ? returnUrl : "/main";

        // 엑세스 토큰과 리플레쉬 토큰 쿠키에 저장
        const cookies = new Cookies();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        cookies.set("accessToken", accessToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        // 유저 정보
        // queryClient
        //   .fetchQuery([QUERY_KEYS.ADMIN_INFO], fetchAdminInfo)
        //   .then(userData => {
        //     setLoading(false)
        //     setUser(userData)
        //     localStorage.setItem('userId', userData.adminId)
        //   })
        // .catch(() => {
        //   setLoading(false)
        // })
        return navigate(redirectURL as string);
      } else if (success === false) {
        toast.error("로그인 오류가 발생하였습니다.1 ", { duration: 5000 });

        // toast.error(message, {duration: 5000})
      } else {
        toast.error("로그인 오류가 발생하였습니다.2 ", { duration: 5000 });
        // toast.error(message);
      }
    },
    onError: (error: any) => {
      // toast.error(error.response.data.message, {duration: 5000})
      toast.error("로그인 오류가 발생하였습니다.", { duration: 5000 });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useLogin;
