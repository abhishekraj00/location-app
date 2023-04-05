import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import "@testing-library/jest-dom/extend-expect";

describe("Home", () => {
  test("renders the current location",() => {
    render(<Home />);
    const Loading = screen.getByTestId("loading");
    expect(Loading).toBeInTheDocument();
  });
});
