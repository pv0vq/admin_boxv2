import { IApi } from "../../type/common";

const API_AUTH: { [key: string]: IApi } = {
  LOGIN: {
    url: "/api/v2/login",
    method: "POST",
  },
};

export default API_AUTH;
