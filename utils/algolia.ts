import algoliasearch, { SearchClient } from "algoliasearch/lite";

import { ALGOLIA_APP_ID } from "./constants";

export default function createSearchClient(apiKey: string): SearchClient {
  return algoliasearch(ALGOLIA_APP_ID, apiKey);
}
