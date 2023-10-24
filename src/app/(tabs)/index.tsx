import { StyleSheet } from "react-native";

import { View, Text } from "@/components";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
