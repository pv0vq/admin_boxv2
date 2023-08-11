import { IApi } from "../../../type/common";

const API_AUTH: { [key: string]: IApi } = {
  LOGIN: {
    url: "/api/v2/login",
    method: "POST",
  },
  LOGOUT: {
    url: "/api/v2/bitteLogout",
    method: "GET",
  },
};

export default API_AUTH;
