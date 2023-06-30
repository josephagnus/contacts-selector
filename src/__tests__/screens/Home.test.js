import { render, screen } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";

import HomeScreen from "../../screens/Home";

test("should show Import contact when params are undefined", () => {
  render(<HomeScreen route={{}} />);
  expect(screen.getByText("Import Contact")).toBeDefined();
  expect(screen.queryByText("Try importing again")).toBeNull();
});

test("should show Import contact when params are defined", () => {
  render(<HomeScreen route={{ params: { input: "3245" } }} />);
  expect(screen.queryByText("Import Contact")).toBeNull();
  expect(screen.getByText("Try importing again")).toBeDefined();
  expect(screen.queryByDisplayValue("3245")).toBeDefined();
});
