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
import fetcher from "../../../../api/fetcher";
import API_COMMETN from "../../../../api/code/board/comment/comment";

interface IOptions {
  id: number;
}

export const fetchDeleteComment = async (id: number) =>
  await fetcher({ api: API_COMMETN.COMMETN_DELETE, options: { id } }).then(
    ({ data }) => data
  );

function useCommentDelete(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  return useMutation(fetchDeleteComment, {
    ...options,
    onSuccess: ({ data, status, success, message }) => {
      if (status === "OK") {
        // 다시 유저 리스트 조회
        queryClient.invalidateQueries("comment_list");
      } else if (success === false) {
        toast.error("댓글 삭제 중 오류가 발생하였습니다. ", { duration: 5000 });
      } else {
        toast.error("댓글 삭제 중 오류가 발생하였습니다.", { duration: 5000 });
      }
    },
    onError: (error: any) => {
      toast.error("댓글 삭제 중 오류가 발생하였습니다.", { duration: 5000 });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useCommentDelete;
