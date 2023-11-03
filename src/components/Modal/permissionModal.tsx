import {
  Button,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

import { View, Text } from "@/components";
import { Colors } from "@/constants";
import { useTheme } from "@/context";

type ModalProps = Modal["props"];

export const PermissionModal = (props: ModalProps) => {
  const { theme } = useTheme();
  return (
    <Modal
      onRequestClose={props.onRequestClose}
      visible={props.visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      {...props}
    >
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
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
              <Button title="close" onPress={props.onRequestClose} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
