import type { NextApiRequest, NextApiResponse } from "next";
import type { SearchClient } from "algoliasearch";
import { ulid } from "ulid";

import { ALGOLIA_ADMIN_API_KEY } from "@/utils/constants";
import createSearchClient from "@/utils/algolia";

const searchClient = createSearchClient(
  ALGOLIA_ADMIN_API_KEY,
  true
) as SearchClient;

const index = searchClient.initIndex("dev_restaurants");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const body = JSON.parse(req.body);

    const objectID = ulid();
    const image_url = `https://www.opentable.com/img/restimages/${objectID}.jpg`;
    const mobile_reserve_url = `http://mobile.opentable.com/opentable/?restId=${objectID}`;
    const reserve_url = `http://www.opentable.com/single.aspx?rid=${objectID}`;
    const food_type = body.cuisine;

    const obj = await index.saveObject({
      ...body,
      objectID,
      image_url,
      mobile_reserve_url,
      reserve_url,
      food_type,
    });

    res.status(200).json(obj);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(400).json({ error: "Something went wrong. Please try again." });
  }
}
