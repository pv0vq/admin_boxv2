import { IApi } from "../../type/common";

const API_USER: { [key: string]: IApi } = {
  USER_LIST: {
    url: "/api/v2/admin/user/list",
    method: "GET",
  },
  USER_DETAIL_INFO: {
    url: "/api/v2/admin/user/",
    method: "GET",
  },
};

export default API_USER;
