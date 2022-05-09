import algoliasearch from "algoliasearch/lite";
import algoliasearchServer from "algoliasearch";

import { ALGOLIA_APP_ID } from "./constants";

export default function createSearchClient(apiKey: string, isServer: boolean) {
  return isServer
    ? algoliasearchServer(ALGOLIA_APP_ID, apiKey)
    : algoliasearch(ALGOLIA_APP_ID, apiKey);
}
