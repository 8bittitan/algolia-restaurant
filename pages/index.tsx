import type { NextPage } from "next";
import { Configure, InstantSearch } from "react-instantsearch-hooks-web";

import createSearchClient from "@/utils/algolia";
import { ALGOLIA_API_KEY } from "@/utils/constants";

import Search from "@/components/Search";
import Hits from "@/components/Hits";
import Filters from "@/components/Filters";

const searchClient = createSearchClient(ALGOLIA_API_KEY);

const Home: NextPage = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_restaurants">
      <Configure hitsPerPage={10} />
      <h1>Homepage</h1>
      <Search />
      <Filters />
      <Hits />
    </InstantSearch>
  );
};

export default Home;
