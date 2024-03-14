import axios, { type AxiosInstance } from "axios";

export type BaseServiceOptions = {
  token: string;
  baseURL: string;
};

export class BaseService {
  public http: AxiosInstance;

  constructor(public readonly options: BaseServiceOptions) {
    this.http = axios.create({
      baseURL: options.baseURL,
      headers: {
        "x-datadata-api-token": options.token,
      },
    });
  }
}
