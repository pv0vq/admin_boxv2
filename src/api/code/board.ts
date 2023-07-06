import { IApi } from "../../type/common";

const API_BOARD: { [key: string]: IApi } = {
  FREE_BOARD_LIST: {
    url: "/api/v2/board/page",
    method: "GET",
  },
};

export default API_BOARD;
