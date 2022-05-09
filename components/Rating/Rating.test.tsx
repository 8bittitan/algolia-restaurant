import { render, screen } from "@testing-library/react";

import Rating from ".";

describe("<Rating />", () => {
  it("renders without crashing", () => {
    render(<Rating rating={2} />);

    expect(screen.getAllByTestId("rating-filled")).toHaveLength(2);
    expect(screen.getAllByTestId("rating-outline")).toHaveLength(3);
  });
});
