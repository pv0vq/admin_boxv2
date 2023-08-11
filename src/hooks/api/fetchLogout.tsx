import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import axios, { AxiosError, AxiosResponse } from "axios";
import fetcher from "@src/api/fetcher";
import API_AUTH from "@src/api/code/auth/auth";

/**
 *  로그아웃 api
 * @param params
 * @returns
 */
export const fetchLogout = async () => {
  const { url, method } = API_AUTH.LOGOUT;
  await fetcher({
    api: {
      url: url,
      method,
    },
  }).then(({ data }) => {
    if (data.code === "ok") {
      localStorage.removeItem("isLogin");
      window.location.href = "/";
    }
  });
};
