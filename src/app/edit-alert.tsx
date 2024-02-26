import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { useAlertStore } from "@/stores/alert/userAlertStore";
import { KeyboardAvoidingView, ScrollView, Text } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

export default function EditAlert() {
  const { alerts } = useAlertStore((set) => set);
  const { id } = useLocalSearchParams<{ id: string }>();

  const renderForms = () => {
    const selectedAlert = alerts.find((alert) => alert.id == id);

    console.log("id poggers", id);
    console.log("console porra", selectedAlert);
    switch (selectedAlert?.trigger.alertType) {
      case "INTERVAL":
        return <IntervalForm initialValue={selectedAlert} />;
      case "WEEKLY":
        return <WeeklyForm initialValue={selectedAlert} />;
      case "DAILY":
        return <DailyForm initialValue={selectedAlert} />;
      case "DATE":
        return <DateForm initialValue={selectedAlert} />;
      default:
        return (
          <Text>Ops, ocorreu um erro, seu alerta não foi encontrado.</Text>
        );
    }
  };

  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>{renderForms()}</ScrollView>
    </KeyboardAvoidingView>
  );
}
