import { memo, useCallback, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Avatar from "./Avatar";
import { Image } from "../Image";
import PhoneNumber from "./PhoneNumber";
import MultipleContacts from "./MultipleContacts";

import { RootStackParamList } from "../../screens/types";

const ContactItem = (props) => {

  const { phoneNumbers } = props;

  const uniqueRecords = useMemo(() => {
    return phoneNumbers.filter(
      (obj, index) =>
      phoneNumbers.findIndex((item) => item.number === obj.number) ===
        index
    );
  }, [phoneNumbers]);

  const [showBottomSheet, setShowBottomsheet] = useState(false);
  const navigator =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pressHandler = useCallback(() => {
    if (uniqueRecords.length > 1) {
      setShowBottomsheet(true);
    } else {
      navigator.navigate('Home', { input: uniqueRecords[0].number })
    }
  }, []);
  return (
    <>
      <TouchableOpacity onPress={pressHandler}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: props.image?.uri }}
              style={styles.image}
              defaultComponent={<Avatar alphabhet={props.name.charAt(0)} />}
            />
          </View>
          <View>
            <Text>{props.name}</Text>
            <PhoneNumber phoneNums={uniqueRecords} />
          </View>
        </View>
      </TouchableOpacity>
      <MultipleContacts
        isVisible={showBottomSheet}
        phoneNumbers={uniqueRecords}
        intialSelected={uniqueRecords[0].number}
        onDismiss={() => setShowBottomsheet(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  type: {
    textTransform: "capitalize",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  imgContainer: {
    marginRight: 8,
  },
});

export default memo(ContactItem);
