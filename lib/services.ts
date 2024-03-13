import { APIKeyService } from "./api-key";

export type CreateServicesOptions = {
  token: string;
};

export function createServices(options: CreateServicesOptions) {
  return {
    apiKey: new APIKeyService(),
  };
}
