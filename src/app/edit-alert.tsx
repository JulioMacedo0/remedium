import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { CreateAlertType } from "@/schema";
import { useAlertStore } from "@/stores/alert/userAlertStore";
import { Text } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function EditAlert() {
  const { alerts } = useAlertStore((set) => set);
  const { id } = useLocalSearchParams<{ id: string }>();

  const renderForms = () => {
    const selectedAlert = alerts.find((alert) => alert.id == id);
    switch (selectedAlert?.trigger.alertType) {
      // case "INTERVAL":
      //   return <IntervalForm setAlertType={ChangeAlertType} />;
      // case "WEEKLY":
      //   return <WeeklyForm setAlertType={ChangeAlertType} />;
      case "DAILY":
        return <DailyForm initialValue={selectedAlert} />;
      // case "DATE":
      //   return <DateForm  />;
      default:
        return (
          <Text>Ops, ocorreu um erro, seu alerta não foi encontrado.</Text>
        );
    }
  };

  return <Text>Teste</Text>;
}
