import { StyleSheet, FlatList } from "react-native";
import { View, ThemedStatusBar, NotificationCard } from "@/components";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

import { PermissionModal } from "@/components/Modal/permissionModal";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<
    Notifications.NotificationRequest[]
  >([]);

  const closeModal = () => {
    setModalVisible(false);
  };

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
    getAllScheduledNotifications();
  }, []);

  const getAllScheduledNotifications = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    console.log(notifications);
    setNotifications(notifications);
  };
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
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <PermissionModal
        onRequestClose={() => closeModal()}
        visible={modalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
