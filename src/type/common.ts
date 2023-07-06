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
