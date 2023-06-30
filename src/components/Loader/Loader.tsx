import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Loader = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Loader;
