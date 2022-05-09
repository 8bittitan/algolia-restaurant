import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hits from "./";
import { noop } from "@types";

vi.mock("react-instantsearch-hooks-web", () => ({
  useSearchBox() {
    return {
      isSearchStalled: false,
    };
  },
}));

let removeHit: noop | null = null;
let showMore: noop | null = null;

let isLastPage = false;

vi.mock("@/hooks/useHits", () => ({
  useHitsApi() {
    return {
      hits: [
        {
          objectID: "1",
          name: "Restaurant 1",
          food_type: "American",
          price: 1,
          rounded_stars_count: 1,
          image_url: "https://via.placeholder.com/150",
        },
      ],
      isLastPage,
      showMore,
      removeHit,
    };
  },
}));

describe("<Hits>", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Hits />);
  });

  it("renders hits", () => {
    render(<Hits />);

    expect(screen.getByText(/Restaurant 1/)).toBeInTheDocument();
  });

  it("calls removeHit", async () => {
    removeHit = vi.fn();
    window.confirm = () => true;

    render(<Hits />);

    await userEvent.click(screen.getByTestId("delete-hit"));

    expect(removeHit).toHaveBeenCalledWith("1");
  });

  it("calls showMore", async () => {
    showMore = vi.fn();

    render(<Hits />);

    await userEvent.click(screen.getByText(/Show more/));

    expect(showMore).toHaveBeenCalled();
  });

  it("does not render show more button", () => {
    isLastPage = true;

    render(<Hits />);

    expect(screen.queryByText(/Show more/)).not.toBeInTheDocument();
  });
});
