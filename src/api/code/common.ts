import { IApi } from "../../type/common";

const API_COMMON: { [key: string]: IApi } = {
  GET_PRE_SIGNED_URL: {
    url: "/api/v2/aws/url",
    method: "GET",
  },
};

export default API_COMMON;
