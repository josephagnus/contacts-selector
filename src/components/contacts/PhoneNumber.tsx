import { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";

const PhoneNumber = (props) => {
  const { phoneNums } = props;
  if (!phoneNums) {
    return null;
  }
  if (phoneNums?.length === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.type}>{`${phoneNums[0].label} - `}</Text>
        <Text>{phoneNums[0].number}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.type}>{`${phoneNums[0].label} - `}</Text>
        <Text>{phoneNums[0].number}</Text>
        <View style={styles.more}>
          <Text>{`+${phoneNums.length - 1}`}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  more: {
    backgroundColor: "#967bb6",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  type: {
    textTransform: "capitalize",
  },
});

export default PhoneNumber;
