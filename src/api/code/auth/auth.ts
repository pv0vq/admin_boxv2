import { IApi } from "../../../type/common";

const API_AUTH: { [key: string]: IApi } = {
  LOGIN: {
    url: "/api/v2/login",
    method: "POST",
  },
  GET_REFRESH_TOKEN: {
    url: "/api/v2/refresh",
    method: "GET",
  },
};

export default API_AUTH;
