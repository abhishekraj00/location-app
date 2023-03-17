import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App component sanpshot test", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
