import { Hit } from "@types";
import { useInfiniteHits } from "react-instantsearch-hooks-web";

export function useHitsApi() {
  const { hits, isLastPage, showMore } = useInfiniteHits<Hit>();

  const removeHit = async (objectId: string) => {
    const res = await fetch("/api/object", {
      method: "DELETE",
      body: JSON.stringify({ objectId }),
    });
    const { error } = await res.json();

    if (error) {
      console.error(error);
      return;
    }

    // TODO: Remove hit from list
  };

  return { hits, removeHit, isLastPage, showMore };
}
