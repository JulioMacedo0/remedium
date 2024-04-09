import { Linking } from "react-native";
import { AlertCard, ThemedStatusBar } from "@/components";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { FlashList } from "@shopify/flash-list";
import { useAlertStore } from "@/stores/alert/userAlertStore";

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
  View,
} from "@gluestack-ui/themed";
import { XIcon } from "lucide-react-native";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import * as Localization from "expo-localization";
import { UserType } from "@/stores/auth/useAuthStore";
import { client } from "@/services/http/httpClient";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);
  const ref = useRef(null);

  const { getAlerts, alerts, loading } = useAlertStore((set) => set);

  const updateUserTimeZone = async () => {
    const { timeZone } = Localization.getCalendars()[0];

    const userServerData = await client.get<UserType>("users/one");

    if (userServerData.data.timeZone == timeZone) return null;

    const updatedUser = await client.patch<UserType>("users", {
      timeZone: timeZone,
    });
    storageService.setItem(STORAGE_KEYS.USER, updatedUser.data);
  };

  useEffect(() => {
    updateUserTimeZone();
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
    <View flex={1}>
      <ThemedStatusBar />

      <View
        px={18}
        style={{
          flexGrow: 1,
        }}
      >
        <FlashList
          // onViewableItemsChanged={({ viewableItems }) => {
          //   console.log(viewableItems);
          // }}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<View style={{ height: 15 }} />}
          ListFooterComponent={<View style={{ height: 15 }} />}
          data={alerts}
          renderItem={({ item, index }) => (
            <AlertCard alert={item} index={index} />
          )}
        />
      </View>

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
