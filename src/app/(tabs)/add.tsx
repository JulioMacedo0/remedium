import { MaterialIcons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
import { useAlertTypeStore } from "@/stores/use-alert-type-store/use-alert-type-store";

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
        return <Text>Chose Frequency {alertType}</Text>;
    }
  };

  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>
        {!alertType && (
          <Select onValueChange={changeAlertType} mt={20}>
            <SelectTrigger variant="rounded" size="md" px={10} py={8}>
              <SelectInput placeholder="Hows frequency?" />
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Interval" value="INTERVAL">
                  <MaterialIcons name="add-chart" size={24} color="black" />
                </SelectItem>
                <SelectItem label="Weekly" value="WEEKLY" />
                <SelectItem label="Daily" value="DAILY" />
                <SelectItem label="Date" value="DATE" />
              </SelectContent>
            </SelectPortal>
          </Select>
        )}

        {renderForms()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
