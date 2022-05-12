import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FN } from "@types";

import Search from "./";

let performSearch: FN<string> | null = null;
let clearSearch: FN<unknown> | null = null;
let hasSearched = false;

vi.mock("@/hooks/useSearch", () => ({
  useSearch() {
    return {
      performSearch,
      clearSearch,
      hasSearched,
    };
  },
}));

describe("<Search>", () => {
  it("renders without crashing", () => {
    render(<Search />);
  });

  it("calls performSearch", async () => {
    performSearch = vi.fn();

    render(<Search />);

    await userEvent.type(
      screen.getByPlaceholderText("Search for a restaurant"),
      "test"
    );

    expect(performSearch).toHaveBeenCalledWith("test");
  });

  it("calls clearSearch", async () => {
    clearSearch = vi.fn();
    hasSearched = true;

    render(<Search />);

    await userEvent.click(screen.getByTestId("clear-search"));

    expect(clearSearch).toHaveBeenCalled();
  });
});
