import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import fetcher from "../../../../api/fetcher";
import API_VENDOR from "../../../../api/code/code/vendor/vendor";

interface IParams {
  vendorName: string;
}

export const fetchAddVendor = async (params: IParams) =>
  await fetcher({ api: API_VENDOR.VENDOR_ADD, options: params }).then(
    ({ data }) => data
  );

function useVendorAdd(
  options?: UseMutationOptions<AxiosResponse<any>, AxiosError, any>
): UseMutationResult<any, AxiosError, any> {
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<any, AxiosError, any> = useMutation(
    fetchAddVendor,
    {
      ...options,
      onSuccess: ({ data, status, success, message }) => {
        if (status === "OK") {
          // 리스트 조회
          queryClient.invalidateQueries("searchPage");
        } else {
          toast.error("제조사 등록 중 오류가 발생하였습니다.", {
            duration: 5000,
          });
        }
      },
      onError: (error: any) => {
        toast.error("제조사 등록 중 오류가 발생하였습니다.", {
          duration: 5000,
        });
      },
      onSettled: (data, error, variables, context) => {},
    }
  );

  return mutation;
}

export default useVendorAdd;
