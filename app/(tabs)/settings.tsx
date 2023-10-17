import { StyleSheet, useColorScheme } from "react-native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

export default function Config() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Theme</Text>
        <View
          style={{
            marginTop: 10,
            backgroundColor: Colors[colorScheme ?? "light"].tabBackground,

            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? "light"].borderColor,
          }}
        >
          <View
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].tabBackground,
              margin: 10,
            }}
          >
            <Text>Automatic</Text>
          </View>
          <View
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].borderColor,
              height: 1,
              width: "100%",
            }}
          />
          <Text>Light</Text>
          <View
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].borderColor,
              height: 1,
              width: "100%",
            }}
          />
          <Text>Dark</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  itemContainer: {
    // borderRadius: 8,
  },
});
