import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import fetcher from "../../../api/fetcher";
import API_INSPECTION from "../../../api/code/inspection";

interface IParams {
  code: string;
}

export const fetchAddIspection = async (params: IParams) =>
  await fetcher({ api: API_INSPECTION.INSPECTION_ADD, options: params }).then(
    ({ data }) => data
  );

function useInspectionAdd(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  return useMutation(fetchAddIspection, {
    ...options,
    onSuccess: ({ data, status, success, message }) => {
      if (status === "OK") {
        // 리스트 조회
        queryClient.invalidateQueries("searchPage");
      } else {
        toast.error("점검 코드 등록 중 오류가 발생하였습니다.", {
          duration: 5000,
        });
      }
    },
    onError: (error: any) => {
      toast.error("점검 코드 등록 중 오류가 발생하였습니다.", {
        duration: 5000,
      });
    },
    onSettled: (data, error, variables, context) => {},
  });
}

export default useInspectionAdd;
