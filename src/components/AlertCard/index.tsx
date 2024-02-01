import { TouchableOpacity, StyleSheet } from "react-native";
import { View } from "@components/View";
import * as Notifications from "expo-notifications";
import { Text } from "@components/Text";
import { useTheme } from "@/context";
import { Colors } from "@/constants";
import { AlertResponse } from "@/stores/alert/userAlertStore";

type AlertCardProps = {
  alerts: AlertResponse;
};

export type weeksValues = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const AlertCard = ({ alerts }: AlertCardProps) => {
  const { theme, getInvertedTheme } = useTheme();

  return <Text>{alerts.title}</Text>;
};
