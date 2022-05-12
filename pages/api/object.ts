import type { NextApiRequest, NextApiResponse } from "next";
import type { SearchClient } from "algoliasearch";
import { ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME } from "@/utils/constants";
import createSearchClient from "@/utils/algolia";

const searchClient = createSearchClient(
  ALGOLIA_ADMIN_API_KEY,
  true
) as SearchClient;

const index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const body = JSON.parse(req.body);

    await index.deleteObject(body.objectId);

    res.status(200).json({});
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(400).json({ error: "Something went wrong. Please try again." });
  }
}
