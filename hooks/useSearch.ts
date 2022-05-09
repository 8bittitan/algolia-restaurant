import { useCallback } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

import debounce from "@/utils/debounce";

export function useSearch() {
  const { refine, clear, query } = useSearchBox();

  const performSearch = useCallback(
    debounce((q) => refine(q)),
    []
  );

  return {
    performSearch,
    clearSearch: clear,
    query,
    hasSearched: query !== "",
  };
}
