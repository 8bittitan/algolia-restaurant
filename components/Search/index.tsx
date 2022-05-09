import { useSearch } from "@/hooks/useSearch";

import styles from "./Search.module.css";

const SEARCH_ICON = (
  <svg
    className={styles.searchIcon}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CLEAR_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Search = () => {
  const { performSearch, clearSearch, hasSearched, query } = useSearch();

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        {SEARCH_ICON}
        <input
          className={styles.input}
          name="search"
          placeholder="Search for a restaurant"
          defaultValue={query}
          onChange={(e) => performSearch(e.target.value)}
        />
        {hasSearched && (
          <button
            data-testid="clear-search"
            className={styles.clear}
            onClick={clearSearch}
          >
            {CLEAR_ICON}
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
