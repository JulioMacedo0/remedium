import { Platform, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  KeyboardAvoidingView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  ScrollView,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { IntervalForm } from "@/forms/interval-form/interval-form";
import { useForm, Controller, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { WeeklyForm } from "@/forms/weekly-from/weekly-form";
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
      default:
        return <Text>Selecione um componente</Text>;
    }
  };

  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>
        <Text>{}</Text>

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
