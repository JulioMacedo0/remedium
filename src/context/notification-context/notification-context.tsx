import { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
interface NotificationContextValue {
  notifications: Notifications.NotificationRequest[];
  addNotification: (notification: Notifications.NotificationRequest) => void;
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

    console.log(notifications);
    setNotifications(notifications);
  };

  useEffect(() => {
    getAllScheduledNotifications();
  }, []);

  const addNotification = (notification: Notifications.NotificationRequest) => {
    setNotifications((previousValue) => [...previousValue, notification]);
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
      value={{ notifications, addNotification, removeNotification }}
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
