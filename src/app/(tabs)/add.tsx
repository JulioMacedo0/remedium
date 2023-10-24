import { StyleSheet } from "react-native";

import { View, Text } from "@/components";

export default function Add() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remedy</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
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
