import { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import fetcher from "../../../../api/fetcher";
import API_VENDOR from "../../../../api/code/code/vendor/vendor";

interface IVendorDetailInfo {
  id: number;
  vendorName: string;
  useYn: string;
  createDate: Date;
  modifiedDate: Date;
}

export const QUERY_KEYS = Object.assign({
  // common
  VENDOR_LIST: "vendorListInfo",
});

export const getVendorList = async () => {
  const { url, method } = API_VENDOR.VENDOR_LIST;
  return await fetcher({
    api: {
      url: url,
      method,
    },
  }).then(({ data }) => {
    return data;
  });
};

export const useVendorList = (): UseQueryResult<
  IVendorDetailInfo[],
  AxiosError
> => {
  return useQuery([QUERY_KEYS.VENDOR_LIST], () => getVendorList(), {
    // 자동 갱신 비활성화
    refetchOnWindowFocus: false,
    // 마운트될 때다 갱신 비활성화
    refetchOnMount: false,
  });
};
