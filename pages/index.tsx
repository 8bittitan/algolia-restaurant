import type { GetServerSideProps, NextPage } from "next";
import {
  Configure,
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { getServerState } from "react-instantsearch-hooks-server";

import createSearchClient from "@/utils/algolia";
import { ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from "@/utils/constants";

import Hits from "@/components/Hits";
import Header from "@/components/Header";

const searchClient = createSearchClient(ALGOLIA_API_KEY);

const Home: NextPage<{
  url: string;
  serverState?: InstantSearchServerState;
}> = ({ url, serverState }) => {
  const handleRouting = () =>
    history({
      getLocation() {
        if (typeof window === "undefined") {
          return new URL(url!) as unknown as Location;
        }

        return window.location;
      },
    });

  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
        routing={{
          router: handleRouting(),
        }}
      >
        <Configure hitsPerPage={10} />
        <Header />
        <main>
          <Hits />
        </main>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const url = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<Home url={url} />);

  return {
    props: {
      serverState,
      url,
    },
  };
};

export default Home;
