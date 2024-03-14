import { BASE_URL_CN, createServices } from "@lib";
import Config from "../config.json";

async function main() {
  const services = createServices({
    token: Config.apiToken,
    baseURL: BASE_URL_CN,
  });

  console.log(services);
}

main().catch((err) => console.error(err));
