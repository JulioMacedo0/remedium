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
} from "@gluestack-ui/themed";
import { IntervalForm } from "@/forms/intervalForm";
export default function Add() {
  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>
        <Select>
          <SelectTrigger variant="rounded" size="md" px={10} py={8}>
            <SelectInput placeholder="Hows frequency?" />
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
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

        <IntervalForm />
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
