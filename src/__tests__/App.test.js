jest.mock("@gorhom/bottom-sheet", () => {
  const reactNative = jest.requireActual("react-native");
  const { View } = reactNative;

  return {
    __esModule: true,
    default: View,
    BottomSheetModal: View,
    BottomSheetModalProvider: View,
    useBottomSheetModal: () => ({
      present: () => {},
      dismiss: () => {},
    }),
  };
});

jest.mock('../service', () => {
    return (
        {
            useContacts: () => ({ isInitialLoading: true })
        }
    )
})

import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";

import App from "../../App";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("should render the home with Import Contacts text", () => {
    render(<App />);
    expect(screen.getByText("Import Contact")).toBeDefined();
  });
});
