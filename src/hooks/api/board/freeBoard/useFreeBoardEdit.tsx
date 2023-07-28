import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import API_BOARD from "../../../../api/code/board";
import fetcher from "../../../../api/fetcher";

interface IParams {
  title: string;
  content: string;
}

export const fetchEditBoard = async (params: IParams) =>
  await fetcher({ api: API_BOARD.FREE_BOARD_EDIT, options: params }).then(
    ({ data }) => data
  );

function useFreeBoardEdit(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  return useMutation(fetchEditBoard, {
    ...options,
    onSuccess: ({ data, status, success, message }) => {
      if (status === "OK") {
        // 리스트 조회
        queryClient.invalidateQueries("searchPage");
      } else {
        toast.error("자유게시판 수정 중 오류가 발생하였습니다.", {
          duration: 5000,
        });
      }
    },
    onError: (error: any) => {
      toast.error("자유게시판 수정 중 오류가 발생하였습니다.", {
        duration: 5000,
      });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useFreeBoardEdit;
