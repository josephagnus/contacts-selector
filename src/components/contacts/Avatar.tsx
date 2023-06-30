import { View, StyleSheet } from "react-native";
import { Text } from 'react-native-paper'

const Avatar = (props) => {
  const { alphabhet } = props;
  return <View style={styles.image}><Text style={styles.text}>{alphabhet}</Text></View>;
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: '#C8A2C8',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 20,
  }
});

export default Avatar;
