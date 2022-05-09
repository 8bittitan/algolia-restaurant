import { Hit } from "@types";
import { useMemo, useState } from "react";
import { useInfiniteHits } from "react-instantsearch-hooks-web";

export function useHitsApi() {
  const { hits, isLastPage, showMore } = useInfiniteHits<Hit>();
  const [removedHits, setRemovedHits] = useState<string[]>([]);

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

    setRemovedHits([...removedHits, objectId]);
  };

  const filteredHits = useMemo(() => {
    return hits.filter((hit) => !removedHits.includes(hit.objectID));
  }, [removedHits, hits]);

  return { hits: filteredHits, removeHit, isLastPage, showMore };
}
