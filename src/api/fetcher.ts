import axios, { AxiosRequestHeaders, AxiosResponse, ResponseType } from "axios";
import API_AUTH from "./code/auth/auth";

let axiosRetryState: boolean = false;

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

/**
 *
 *
 * @param response
 * @returns
 */
function AxiosAuthInterceptor<T>(response: AxiosResponse<T>): AxiosResponse {
  const { status, data }: any = response;
  if (status === 404) {
    // 404 에러시
    localStorage.removeItem("isLogin");
  } else if (status === 401) {
    // 401 에러시

    // 토큰 만료 시
    if (data.code === "EXPIRED_TOKEN") {
      localStorage.removeItem("isLogin");
      window.location.href = "/";
    }
    //   axiosRetryState = true;
    //   return refreshTokenHandler(response.config);
    // }
    // UNAUTHORIZED
  } else if (status === 0) {
    //backend 서버가 죽었을 때 로그인 페이지로 이동.
    // 여기서 useNavigate 함수를 사용하지 못합니다.
    localStorage.removeItem("isLogin");
    window.location.href = "/";
  }

  return response;
}

/**
 * 리프레쉬 토큰 처리
 * 20230810 서버에서 리프레쉬 처리 추가
 *
 */
// const refreshTokenHandler = (config: any): any => {
//   axios
//     .get(apiUrl + API_AUTH.GET_REFRESH_TOKEN.url, {
//       withCredentials: true,
//     })
//     .then(({ data, headers }) => {
//       axiosRetryState = false;
//       if (data === "OK") {
//         // 오류난 api 재호출
//         return axiosInstance().interceptors.response.use(config);
//       }
//     })
//     .catch((err: any) => {
//       // localStorage.removeItem("isUse");
//       // window.location.href = "/";
//       return Promise.reject(err);
//     });
// };

const fetcher = async function ({
  api,
  options = {},
  // type = "json",
  responseType,
  headers,
}: {
  api: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
  };
  options?: { [key: string]: any };
  // type?: "json" | "formData";
  responseType?: ResponseType;
  headers?: AxiosRequestHeaders;
}) {
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
        headers: {
          // 추가
          "Access-Control-Allow-Origin": "*",
        },
        responseType: responseType,
        withCredentials: true,
      });
    } else {
      // formData
      // const formData = new FormData();
      // if (type === "formData") {
      //   for (const key in options) {
      //     formData.append(key, options[key]);
      //   }
      // }

      return await ax.request({
        ...api,
        url: `${apiUrl}${api.url}`,
        // data: type === "json" ? options : formData,
        data: options,
        headers,
        withCredentials: true,
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
