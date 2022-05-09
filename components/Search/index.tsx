import debounce from "@/utils/debounce";
import { useCallback } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

const Search = () => {
  const { refine } = useSearchBox();

  const handleSearch = (q: string) => {
    refine(q);
  };

  const handleChange = useCallback(debounce(handleSearch), []);

  return (
    <div>
      <input
        name="search"
        placeholder="Search a restaurant"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
