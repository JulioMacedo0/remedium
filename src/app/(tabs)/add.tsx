import { StyleSheet } from "react-native";
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

import { useState } from "react";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
import { DailyForm } from "@/forms/daily-form/daily-form";
import { DateForm } from "@/forms/date-form/date-form";
export default function Add() {
  const [alertType, setAlertType] = useState("");

  const ChangeAlertType = (value: string) => {
    setAlertType(value);
  };

  const renderForms = () => {
    switch (alertType) {
      case "INTERVAL":
        return <IntervalForm setAlertType={ChangeAlertType} />;
      case "WEEKLY":
        return <WeeklyForm setAlertType={ChangeAlertType} />;
      case "DAILY":
        return <DailyForm setAlertType={ChangeAlertType} />;
      case "DATE":
        return <DateForm setAlertType={ChangeAlertType} />;
      default:
        return <Text>Selecione um componente</Text>;
    }
  };

  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>
        {!alertType && (
          <Select onValueChange={setAlertType}>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
