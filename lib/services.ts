import { APIKeyService } from "./api-key";
import { ChartService } from "./chart";
import type { BaseServiceOptions } from "./common";
import { QueryService } from "./query";

export const BASE_URL_CN = "https://www.datadata.cn";
export const BASE_URL_GLOBAL = "https://www.datadata.com";

export function createServices(options: BaseServiceOptions) {
  return {
    apiKey: new APIKeyService(options),
    chart: new ChartService(options),
    query: new QueryService(options),
  };
}
