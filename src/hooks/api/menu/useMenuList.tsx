import API_MENU from "@src/api/code/menu/menu";
import fetcher from "@src/api/fetcher";
import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

export interface IMenu {
  id: number;
  menuName: string;
  path: string;
  parentId: number | null;
  children: IMenu[];
}

export const QUERY_KEYS = Object.assign({
  MENU_LIST: "menu_list",
});

/**
 *  메뉴 목록 조회  API
 * @param params
 * @returns
 */
export const fetchMenuList = async () => {
  const { url, method } = API_MENU.MENU_LIST;
  return await fetcher({
    api: {
      url: url,
      method,
    },
  }).then(({ data }) => data.data);
};

export default function useMenuList(): UseQueryResult<IMenu[], AxiosError> {
  return useQuery([QUERY_KEYS.MENU_LIST], () => fetchMenuList(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
