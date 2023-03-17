import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockGeolocation } from "jest-mock-geo";
import Home from "../pages/Home";

describe("Home component", () => {
  test("renders location name when geolocation permission is granted", async () => {
    // grant permission to access geolocation
    mockGeolocation.mockPermission(true);

    // set the latitude and longitude to a known location
    mockGeolocation.mockPosition({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    });

    render(<Home />);

    // wait for the location name to be displayed
    const locationName = await screen.findByTestId("list-current-name");
    expect(locationName).toHaveTextContent("San Francisco");
  });

  test("renders the location name", async () => {
    render(<Home />);
    const locationName = await screen.findByTestId("list-current-name");
    expect(locationName).toHaveTextContent("Your current location is:");
  });

  test("renders the current time", async () => {
    render(<Home />);
    const currentTime = await screen.findByTestId("list-current-time");
    expect(currentTime).toHaveTextContent("As of:");
  });
});
