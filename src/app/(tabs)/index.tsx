import {
  StyleSheet,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text } from "@/components";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants";
import { useTheme } from "@/context";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const { theme } = useTheme();
  useEffect(() => {
    (async function () {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log("1", finalStatus);
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("2", finalStatus);
      }
      if (finalStatus !== "granted") {
        setModalVisible(true);
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openModal()}>
        <Text> open</Text>
      </TouchableOpacity>
      <Modal
        onRequestClose={() => closeModal()}
        visible={modalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "85%",

                  borderRadius: 8,
                  paddingVertical: 24,
                  paddingHorizontal: 12,
                  backgroundColor: Colors[theme].tabBackground,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Suas notificações estão desativadas !</Text>
                <Button
                  title="close"
                  onPress={() => {
                    setModalVisible(false);
                    console.log("press");
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
