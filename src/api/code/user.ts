import { IApi } from "../../type/common";

const API_USER: { [key: string]: IApi } = {
  USER_LIST: {
    url: "/admin/v2/user/list",
    method: "GET",
  },
};

export default API_USER;
