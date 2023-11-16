import { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
interface NotificationContextValue {
  notifications: Notifications.NotificationRequest[];
  updateNotification: () => void;
  removeNotification: (identifier: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export function NotificationProvider(props: ProviderProps) {
  const [notifications, setNotifications] = useState<
    Notifications.NotificationRequest[]
  >([]);

  const getAllScheduledNotifications = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    setNotifications(notifications);
  };

  useEffect(() => {
    getAllScheduledNotifications();
  }, []);

  const updateNotification = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    setNotifications(notifications);
  };
  const removeNotification = (identifier: string) => {
    setNotifications((previousValue) =>
      previousValue.filter(
        (notifcation) => notifcation.identifier != identifier
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, updateNotification, removeNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error(
      "useTheme must be used within an NotificationContextProvider"
    );
  }

  return notificationContext;
};
