import { TouchableOpacity, StyleSheet } from "react-native";
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
    const weeks = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday",
    };

    const weekDay = Notification.trigger.weekday;

    dataFormatada = `Every ${weeks[weekDay]} at  ${
      Notification.trigger.hour
    }:${Notification.trigger.minute.toString().padStart(2, "0")}`;
  }

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: Colors[getInvertedTheme()].tabBackground,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: Colors[theme].tabBarActiveTintColor,
          },
        ]}
      >
        <Text style={[styles.titleButton]}>{Notification.content.title}</Text>
        <Text>{Notification.trigger.type}</Text>
      </View>

      <View
        style={[
          styles.bodyView,
          {
            backgroundColor: Colors[theme].tabBackground,
          },
        ]}
      >
        <Text>{Notification.content.body}</Text>

        <View transparent style={[styles.row, styles.footer]}>
          <View transparent style={[styles.row, styles.trigger]}>
            <Text>{dataFormatada}</Text>
          </View>

          <View
            transparent
            style={[
              styles.row,
              {
                alignSelf: "flex-end",
                gap: 6,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.deleteButton,
                {
                  backgroundColor: "#f00",
                },
              ]}
              onPress={() => {
                Notifications.cancelScheduledNotificationAsync(
                  Notification.identifier
                );
              }}
            >
              <Text style={styles.titleButton}>DELETE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.viewButton,
                {
                  backgroundColor: Colors[theme].tabBarActiveTintColor,
                },
              ]}
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
            >
              <Text style={styles.titleButton}>VIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 15,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  header: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "space-between",
  },

  viewButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titleButton: {
    color: "#fff",
  },
  bodyView: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  trigger: {
    gap: 5,
  },
});
