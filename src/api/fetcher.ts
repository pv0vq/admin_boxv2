import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const axiosInstance = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 5000,
    withCredentials: false,
  });
};

const apiUrl = `${import.meta.env.VITE_APP_PROTOCOL}://${
  import.meta.env.VITE_APP_API_URL
}`;

function AxiosAuthInterceptor<T>(response: AxiosResponse<T>): AxiosResponse {
  console.log(response, "response");
  const status = response.status;

  const navigate = useNavigate();
  if (status === 404) {
    // 404 에러시
    console.log(404, "에러");
    // throw new NotFoundError()
  } else if (status === 401) {
    // 401 에러시
    console.log(401, "에러");
    // throw new AuthError()
  } else if (status === 0) {
    //backend 서버가 죽었을 때 로그인 페이지로 이동.
    navigate("/");
  }
  return response;
}

const fetcher = async function ({
  api,
  options = {},
  type = "json",
  responseType,
  headers,
}: {
  api: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
  };
  options?: { [key: string]: any };
  type?: "json" | "formData";
  responseType?: ResponseType;
  headers?: AxiosRequestHeaders;
}) {
  const Authorization = axios.defaults.headers.common["Authorization"];
  // react-cookie 라이브러리 사용
  const cookies = new Cookies();
  const { accessToken, refreshToken } = cookies.getAll();
  if (!Authorization) {
    // 토큰이 유실되었다면 재설정
    if (accessToken) {
      const cookies = new Cookies();
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
    }
  }
  const ax = axiosInstance();
  ax.interceptors.response.use(
    function (response) {
      return AxiosAuthInterceptor(response);
    },
    function (error) {
      return AxiosAuthInterceptor(error.response);
    }
  );
  try {
    if (api.method === "GET") {
      return await ax.request({
        ...api,
        url: `${apiUrl}${api.url}`,
        params: options,
        // responseType: 'basic',
        headers,
      });
    } else {
      const formData = new FormData();
      if (type === "formData") {
        for (const key in options) {
          formData.append(key, options[key]);
        }
      }

      return await ax.request({
        ...api,
        url: `${apiUrl}${api.url}`,
        data: type === "json" ? options : formData,
        headers,
      });
    }
  } catch (error: any) {
    if (typeof window !== "undefined") {
      // 윈도우를 못찾을 경우
      console.log("윈도우 객체 오류!");

      // if (isInstanceOfAPIError(error)) {
      //     const {redirectUrl, notFound} = error
      //     if (notFound) {
      //         router.push('/404')
      //     } else {
      //         router.replace(redirectUrl)
      //     }
      // }
    }
    return Promise.reject(error);
  }
};

export default fetcher;
