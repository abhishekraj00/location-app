import { render, screen } from "@testing-library/react";
import App, { LocationsContext } from "../App";
import renderer from "react-test-renderer";

describe("App", () => {
  
  test("should render correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    render(
      <LocationsContext.Provider
        value={{ locations: [], setLocations: jest.fn() }}
      >
        <App />
      </LocationsContext.Provider>
    );
    const homeLink = screen.getByText("Home");
    const mapLink = screen.getByText("Map");
    expect(homeLink).toBeInTheDocument();
    expect(mapLink).toBeInTheDocument();
  });
});
