import { render, screen } from "@testing-library/react";

import PriceDisplay from ".";

describe("<PriceDisplay />", () => {
  it("renders without crashing", () => {
    render(<PriceDisplay price={3} />);

    expect(screen.getAllByTestId("price-icon")).toHaveLength(3);
  });
});
