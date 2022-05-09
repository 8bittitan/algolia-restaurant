import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { noop } from "@types";

import Filters from "./";

let refine: noop | null = null;

vi.mock("react-instantsearch-hooks-web", () => ({
  useRefinementList() {
    return {
      items: [{ label: "American", value: "american" }],
      refine,
    };
  },
}));

describe("<Filters>", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Filters />);
  });

  it("renders the appropriate filters", () => {
    render(<Filters />);

    expect(screen.getByText("American")).toBeInTheDocument();
  });

  it("calls refine when selecting a filter", async () => {
    refine = vi.fn();

    render(<Filters />);

    await userEvent.click(screen.getByText("American"));

    expect(refine).toHaveBeenCalledWith("american");
  });
});
