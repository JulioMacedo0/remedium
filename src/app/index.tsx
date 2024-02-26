import { Text } from "@gluestack-ui/themed";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>Carregando...</Text>
    </SafeAreaView>
  );
}
