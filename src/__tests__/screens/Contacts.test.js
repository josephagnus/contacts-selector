import { render, screen, renderHook } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";

import ContactScreen from "../../screens/Contacts";
import * as services from "../../service";
import { NavigationContainer } from "@react-navigation/native";

import BottomSheet from '../../components/Bottomsheet';
import Exception from "../../service/Exception";

jest.mock("../../service", () => {
  let value = 0;
  let error = null;
  const updateValue = (val = 1) => {
    value = +val;
  };
  const updateError = (err) => {
    error = err;
  }
  return {
    useContacts: () => {
      if (value === 0) {
        return { isInitialLoading: true };
      } else if (value === 1) {
        return {
          data: [
            {
              name: "Agnus maria Joseph",
              phoneNumbers: [{ number: "32344", label: "home" }],
            },
          ],
        };
      } else if (value === 2) {
        return {
          data: [
            {
              name: "Agnus maria Joseph",
              phoneNumbers: [{ number: "32344", label: "home" }],
            },
            {
              name: "test",
              phoneNumbers: [{ number: "90087", label: "home" }, { number: "907655", label: "work" }],
            },
          ],
        };
      } else if (value === 3) {
        return {
          data: [],
        };
      } else if (value === 4) {
        return {
          error,
        };
      }
    },
    updateValue: updateValue,
    updateError: updateError
  };
});

jest.mock("../../components/Bottomsheet", () => {
  const reactNative = jest.requireActual("react-native");
  const { View } = reactNative;
  return ({
    Bottomsheet: ({ isVisible, onDismiss }) => <View />
  })
});

const useContacts = services.useContacts;
services.useContacts = jest.fn;

describe(('test Contacts'), () => {
  test("should show loading state when the content is loading", () => {
    render(<ContactScreen />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });
  
  test("should show contact list when data is returned", () => {
    services.updateValue();
    render(
      <NavigationContainer>
        <ContactScreen />
      </NavigationContainer>
    );
    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("Agnus maria Joseph")).toBeDefined();
    expect(screen.getByText("home - ")).toBeDefined();
    expect(screen.getByText("32344")).toBeDefined();
  });
  
  test("should show multiple contacts when the data is more than one", () => {
    services.updateValue(2);
    render(
      <NavigationContainer>
        <ContactScreen />
      </NavigationContainer>
    );
    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("Agnus maria Joseph")).toBeDefined();
    expect(screen.getAllByText("home - ").length).toBe(2);
    expect(screen.getByText("32344")).toBeDefined();
    expect(screen.getByText("+1")).toBeDefined();
  });
  
  test("should show Add Contacts text when there are no contacts", () => {
    services.updateValue(3);
    render(
      <NavigationContainer>
        <ContactScreen />
      </NavigationContainer>
    );
    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("Please add contacts")).toBeDefined();
  });

  test("should show the error when there is an error", () => {
    services.updateValue(4);
    services.updateError(new Exception("Allow permission"));
    render(
      <NavigationContainer>
        <ContactScreen />
      </NavigationContainer>
    );
    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("Allow permission")).toBeDefined();
  });
})

