import { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import fetcher from "../../../api/fetcher";
import API_INSPECTION from "../../../api/code/inspection";

interface IVendorDetailInfo {
  id: number;
  vendorName: string;
  useYn: string;
  createDate: Date;
  modifiedDate: Date;
}

export const QUERY_KEYS = Object.assign({
  // common
  INSPECTION_CODE_LIST: "inspectionCodeList",
});

export const fetchInspectionCodeList = async () => {
  const { url, method } = API_INSPECTION.INSPECTION_CODE_LIST;
  return await fetcher({
    api: {
      url: url,
      method,
    },
  }).then(({ data }) => {
    return data;
  });
};

export const useInspectionCodeList = (): any => {
  const query: UseQueryResult<IVendorDetailInfo, AxiosError> = useQuery(
    [QUERY_KEYS.INSPECTION_CODE_LIST],
    () => fetchInspectionCodeList(),
    {
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    }
  );
  return {
    ...query,
    codeList: query.data,
  };
};
