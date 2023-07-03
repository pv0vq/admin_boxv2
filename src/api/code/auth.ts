import { IApi } from "../../type/common";

const API_AUTH: { [key: string]: IApi } = {
  LOGIN: {
    url: "/login/simple",
    method: "POST",
  },
};

export default API_AUTH;
