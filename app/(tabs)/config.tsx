import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function Config() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
