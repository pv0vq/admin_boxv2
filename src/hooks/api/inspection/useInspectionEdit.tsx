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
  checkAction: string;
  code: string;
  id: number;
  imagePath: string;
  modifiedDate: "20230726";
  useYn: string;
  vendorId: number;
}

export const fetchEditInspection = async (params: IParams) =>
  await fetcher({ api: API_INSPECTION.INSPECTION_EDIT, options: params }).then(
    ({ data }) => data
  );

function useInspectionEdit(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<any, AxiosError, any> = useMutation(
    fetchEditInspection,
    {
      ...options,
      onSuccess: ({ data, status, success, message }) => {
        if (status === "OK") {
          // 리스트 조회
          queryClient.invalidateQueries("searchPage");
          queryClient.invalidateQueries("inspectionDetailInfo");
        } else {
          toast.error("점검 사항 수정 중 오류가 발생하였습니다.", {
            duration: 5000,
          });
        }
      },
      onError: (error: any) => {
        toast.error("점검 사항 수정 중 오류가 발생하였습니다.", {
          duration: 5000,
        });
      },
      onSettled: (data, error, variables, context) => {},
    }
  );

  return mutation;
}

export default useInspectionEdit;
