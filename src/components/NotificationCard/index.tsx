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

  let dataFormatada: String = "";

  if (Notification.trigger.type == "timeInterval") {
    const hour = Math.floor(Notification.trigger.seconds / 3600);
    const minute = Math.floor((Notification.trigger.seconds % 3600) / 60);

    if (hour > 0 || minute > 0) {
      dataFormatada += "Every ";
    }

    if (hour > 0) {
      dataFormatada += `${hour}h`;
    }

    if (minute > 0) {
      dataFormatada += ` ${minute}m`;
    }
  } else if (Notification.trigger.type == "daily") {
    dataFormatada = `Every day at ${
      Notification.trigger.hour
    }:${Notification.trigger.minute.toString().padStart(2, "0")}`;
  } else if (Notification.trigger.type == "date") {
    const timestamp = Notification.trigger.value;
    const data = new Date(timestamp);
    dataFormatada = `One time at ${data.toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (Notification.trigger.type == "weekly") {
  }

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
            trigger: null,
          });
          console.log(id);
        }}
      />
    </View>
  );
};
