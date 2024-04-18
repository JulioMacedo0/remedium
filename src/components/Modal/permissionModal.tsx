import { Button, Modal, TouchableWithoutFeedback } from "react-native";

import { View } from "@/components";
import { Box, Text } from "@/constants";

type ModalProps = Modal["props"];

export const PermissionModal = (props: ModalProps) => {
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
            <Box
              bg="tabBackground"
              style={{
                width: "85%",
                borderRadius: 8,
                paddingVertical: 24,
                paddingHorizontal: 12,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Suas notificações estão desativadas !</Text>
              <Button title="close" onPress={props.onRequestClose} />
            </Box>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
