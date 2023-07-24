import { AxiosError, AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import fetcher from "../../../api/fetcher";
import API_VENDOR from "../../../api/code/vendor";

interface IVendorDetailInfo {
  id: number;
  vendorName: string;
  useYn: string;
  createDate: Date;
  modifiedDate: Date;
}

export const QUERY_KEYS = Object.assign({
  // common
  VENDOR_DETAIL: "vendorDetailInfo",
});

export const getVendorDetailInfo = async (id: number) => {
  const { url, method } = API_VENDOR.VENDOR_DETAIL_INFO;
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

export const useVendorDetailInfo = (id: number): any => {
  const query: UseQueryResult<IVendorDetailInfo, AxiosError> = useQuery(
    [QUERY_KEYS.VENDOR_DETAIL, id],
    () => getVendorDetailInfo(id),
    {
      // 자동 갱신 비활성화
      refetchOnWindowFocus: false,
      // 마운트될 때다 갱신 비활성화
      refetchOnMount: false,
    }
  );

  return {
    ...query,
    detail: query.data,
  };
};
