import axios, { type AxiosInstance } from "axios";

export class BaseService {
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create();
  }
}
