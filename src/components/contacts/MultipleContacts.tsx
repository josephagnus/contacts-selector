import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Bottomsheet } from "../Bottomsheet";

import { RootStackParamList } from "../../screens/types";

const MultipleContacts = (props) => {
  const { phoneNumbers } = props;
  const [selected, setSelected] = useState(props.intialSelected);
  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const onPressHandler = (value) => {
    setSelected(value);
    navigator.navigate("Home", { input: value });
  };
  return (
    <Bottomsheet isVisible={props.isVisible} onDismiss={props.onDismiss}>
      <View>
        {phoneNumbers.map((phoneNum, index) => (
          <TouchableOpacity
            onPress={() => onPressHandler(phoneNum.number)}
            key={phoneNum.id}
          >
            <View style={styles.container}>
              <RadioButton
                value={phoneNum.number}
                status={phoneNum.number === selected ? "checked" : "unchecked"}
                key={`${phoneNum.id}-${index}`}
              />
              <Text style={styles.text}>{`${phoneNum.label} - `}</Text>
              <Text>{phoneNum.number}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Bottomsheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textTransform: "capitalize",
  },
});

export default MultipleContacts;
