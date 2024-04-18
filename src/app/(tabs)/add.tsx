import { KeyboardAvoidingView, ScrollView, Text } from "@gluestack-ui/themed";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
import { useAlertTypeStore } from "@/stores/use-alert-type-store/use-alert-type-store";
import { Screen, Select } from "@/components";
import { Theme } from "@/constants";
import { useTheme } from "@shopify/restyle";

export default function Add() {
  const { alertType, changeAlertType } = useAlertTypeStore((state) => state);

  const renderForms = () => {
    switch (alertType) {
      case "INTERVAL":
        return (
          <IntervalForm setAlertType={changeAlertType} submitType="CREATE" />
        );
      case "WEEKLY":
        return (
          <WeeklyForm setAlertType={changeAlertType} submitType="CREATE" />
        );
      case "DAILY":
        return <DailyForm setAlertType={changeAlertType} submitType="CREATE" />;
      case "DATE":
        return <DateForm setAlertType={changeAlertType} submitType="CREATE" />;
      default:
        return <Text></Text>;
    }
  };

  const theme = useTheme<Theme>();
  const { text, tabBackground } = theme.colors;

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1, zIndex: 999 }}>
        <ScrollView>
          {!alertType && <Select onValueChange={changeAlertType} />}

          {renderForms()}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
