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
  SelectItemText,
} from "@gluestack-ui/themed";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
import { useAlertTypeStore } from "@/stores/use-alert-type-store/use-alert-type-store";
import { Screen } from "@/components";
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
          {!alertType && (
            <Select onValueChange={changeAlertType}>
              <SelectTrigger variant="rounded" size="md">
                <SelectInput
                  placeholder="Hows frequency?"
                  placeholderTextColor={text}
                  color={text}
                />
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={text}
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent bg={tabBackground}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator bg={text} />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Interval" value="INTERVAL" />
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
    </Screen>
  );
}
