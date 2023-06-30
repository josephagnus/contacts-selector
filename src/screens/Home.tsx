import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = (props: Props) => {
  const { navigation, route } = props;
  const { params } = route;

  if (params) {
    const { input } = params;
    return (
      <View style={styles.container}>
        <TextInput value={input} testID="input-number" />
        <Button
          onPress={() => navigation.navigate("Contacts")}
          testID="import-contacts"
        >
          Try importing again
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("Contacts")}
        testID="import-contacts"
      >
        Import Contact
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
