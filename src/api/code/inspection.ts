import { IApi } from "../../type/common";

const API_INSPECTION: { [key: string]: IApi } = {
  INSPECTION_PAGE: {
    url: "/api/v2/admin/ev/inspection/page",
    method: "GET",
  },
  INSPECTION_DETAIL_INFO: {
    url: "/api/v2/admin/ev/inspection/",
    method: "GET",
  },
  INSPECTION_ADD: {
    url: "/api/v2/admin/ev/inspection/save",
    method: "POST",
  },
  INSPECTION_EDIT: {
    url: "/api/v2/admin/ev/inspection/edit",
    method: "PUT",
  },
};

export default API_INSPECTION;
