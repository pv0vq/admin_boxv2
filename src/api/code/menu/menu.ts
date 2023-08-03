import { IApi } from "@src/type/common";

const API_MENU: { [key: string]: IApi } = {
  MENU_LIST: {
    url: "/api/v2/menu/list",
    method: "GET",
  },
  MENU_SAVE: {
    url: "/api/v2/menu/save",
    method: "GET",
  },
  MENU_DELETE: {
    url: "/api/v2/menu/delete",
    method: "DELETE",
  },
};

export default API_MENU;
