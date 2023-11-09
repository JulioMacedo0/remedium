import { Button } from "react-native";
import { View } from "@components/View";
import * as Notifications from "expo-notifications";
import { Text } from "@components/Text";
import { useTheme } from "@/context";
import { Colors } from "@/constants";

type NotificationCardProps = {
  Notification: Notifications.NotificationRequest;
};
export const NotificationCard = ({ Notification }: NotificationCardProps) => {
  const { theme, getInvertedTheme } = useTheme();

  const timestamp = Notification.trigger.value;
  const data = new Date(timestamp);

  const dataFormatada = data.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <View
      style={{
        backgroundColor: Colors[theme].tabBackground,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors[getInvertedTheme()].tabBackground,
      }}
    >
      <Text>{Notification.content.title}</Text>
      <Text>{Notification.content.subtitle}</Text>
      <Text>{Notification.content.body}</Text>
      <Text>{dataFormatada}</Text>
      <Text>{Notification.trigger.type}</Text>
      <Button
        title="delete"
        onPress={() => {
          Notifications.cancelScheduledNotificationAsync(
            Notification.identifier
          );
        }}
      />
      <Button
        title="View"
        onPress={async () => {
          const id = await Notifications.scheduleNotificationAsync({
            content: {
              title: Notification.content.title,
              subtitle: Notification.content.subtitle,
              body: Notification.content.body,
              data: Notification.content.data,
            },
            trigger: {
              seconds: 1,
            },
          });
          console.log(id);
        }}
      />
    </View>
  );
};
