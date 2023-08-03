import { IApi } from "../../../../type/common";

const API_VENDOR: { [key: string]: IApi } = {
  VENDOR_LIST: {
    url: "/api/v2/admin/ev/vendor/list",
    method: "GET",
  },
  VENDOR_PAGE: {
    url: "/api/v2/admin/ev/vendor/page",
    method: "GET",
  },
  VENDOR_DETAIL_INFO: {
    url: "/api/v2/admin/ev/vendor/",
    method: "GET",
  },
  VENDOR_ADD: {
    url: "/api/v2/admin/ev/vendor/save",
    method: "POST",
  },
  VENDOR_EDIT: {
    url: "/api/v2/admin/ev/vendor/edit",
    method: "PUT",
  },
};

export default API_VENDOR;
