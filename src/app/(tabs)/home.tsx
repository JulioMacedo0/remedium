import { StyleSheet, FlatList, Linking } from "react-native";
import { View, ThemedStatusBar } from "@/components";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import { PermissionModal } from "@/components/Modal/permissionModal";
import { useNotification } from "@/context";
import { useAlertStore } from "@/stores/alert/userAlertStore";
import { AlertCard } from "@/components/AlertCard";
import {
  Button,
  ButtonText,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
  Text,
} from "@gluestack-ui/themed";
import { XIcon } from "lucide-react-native";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const ref = useRef(null);

  const { getAlerts, alerts, loading } = useAlertStore((set) => set);

  useEffect(() => {
    getAlerts();
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
        setShowModal(true);
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ThemedStatusBar />
      <FlatList
        ListHeaderComponent={<View style={{ height: 15 }} />}
        ListFooterComponent={<View style={{ height: 15 }} />}
        style={{
          flex: 1,
          width: "90%",
        }}
        data={alerts}
        renderItem={({ item, index }) => (
          <AlertCard alert={item} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader alignItems="flex-start">
            <Heading textAlign="center" size="md">
              Your notifications are turned off
            </Heading>
            <ModalCloseButton>
              <Icon as={XIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text textAlign="center">
              For the app to work properly, you need to enable app notifications
              on your device.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
                Linking.openSettings();
              }}
            >
              <ButtonText>Go to settings</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
