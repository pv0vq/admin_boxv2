import { IApi } from "../../../../type/common";

const API_COMMETN: { [key: string]: IApi } = {
  COMMETN_LIST: {
    url: "/api/v2/comment/page",
    method: "GET",
  },
  COMMETN_DELETE: {
    url: "/api/v2/comment/delete",
    method: "PUT",
  },
};

export default API_COMMETN;
