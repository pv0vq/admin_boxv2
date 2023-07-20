import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import axios, { AxiosError, AxiosResponse } from "axios";
import API_USER from "../../../api/code/user";
import fetcher from "../../../api/fetcher";

interface IOptions {
  email: string;
  password: string;
}

export const fetchAddUser = async (params: IOptions) =>
  await fetcher({ api: API_USER.USER_ADD, options: params }).then(
    ({ data }) => data
  );

function useUserAdd(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  return useMutation(fetchAddUser, {
    ...options,
    onSuccess: ({ data, status, success, message }) => {
      if (status === "OK") {
        queryClient.invalidateQueries("searchPage");
        console.log("data:", data, 1);
        if (data.type === "duplication") {
          console.log("data:", data, 2);
          toast.error("존재하는 이메일입니다. ", { duration: 5000 });
        }
      } else if (success === false) {
        toast.error("유저 등록 중 오류가 발생하였습니다. ", { duration: 5000 });
      } else {
        toast.error("유저 등록 중 오류가 발생하였습니다.", { duration: 5000 });
      }
    },
    onError: (error: any) => {
      toast.error("유저 등록 중 오류가 발생하였습니다.", { duration: 5000 });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useUserAdd;
