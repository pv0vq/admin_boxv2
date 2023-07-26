import { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import fetcher from "../../../api/fetcher";
import API_INSPECTION from "../../../api/code/inspection";

interface IInspectionDetailInfo {
  id: number;
  code: string;
  checkAction: string;
  useYn: string;
  vendorId: number;
  imagePath: string;
  createDate: Date;
  modifiedDate: Date;
  creatorName: string;
  creatorEmail: string;
}

export const QUERY_KEYS = Object.assign({
  // common
  INSPECTION_DETAIL: "inspectionDetailInfo",
});

export const fetchInspectionDetailInfo = async (id: number) => {
  const { url, method } = API_INSPECTION.INSPECTION_DETAIL_INFO;
  if (id)
    return await fetcher({
      api: {
        url: url + id,
        method,
      },
    }).then(({ data }) => {
      return data.data;
    });
};

export const useInspectionDetailInfo = (
  id: number
): UseQueryResult<IInspectionDetailInfo, AxiosError> => {
  return useQuery(
    [QUERY_KEYS.INSPECTION_DETAIL, id],
    () => fetchInspectionDetailInfo(id),
    {
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    }
  );
};
