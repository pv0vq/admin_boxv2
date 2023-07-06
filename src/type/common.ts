export interface IApi {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export interface IOptions {
  label: string;
  value: string;
}

export interface IIdOptions {
  id: number;
  label: string;
}

export interface IColumns {
  id: string;
  label: string;
}

export interface ISearchItem {
  type: string;
  value: string;
  label: string;
  optin?: IOptions[];
}

export interface IPageData {
  content: { [key: string]: any }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  };
  size: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  totalElements: number;
  totalPages: number;
}
