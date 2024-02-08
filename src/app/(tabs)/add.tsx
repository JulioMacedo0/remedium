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
import { IntervalForm } from "@/forms/intervalForm";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Alert, AlertSchema } from "@/schema/alert-schema";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Alert>({
    resolver: zodResolver(AlertSchema),
  });

  const triggerType = useWatch({ control, name: "trigger.alertType" });

  const onSubmit = (data: Alert) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView px={10} py={10} style={{ flex: 1, zIndex: 999 }}>
      <ScrollView>
        <Text>{}</Text>
        <Controller
          control={control}
          name="trigger.alertType"
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <Select
              isRequired
              isInvalid={!!errors.trigger?.alertType?.message}
              onValueChange={onChange}
              onClose={onBlur}
              selectedValue={value}
            >
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

              <Text
                mb={8}
                color="$red600"
                fontWeight="$medium"
                fontSize={"$sm"}
                textAlign="center"
              >
                {errors.trigger?.alertType?.message}
              </Text>
            </Select>
          )}
        />

        <IntervalForm control={control} errors={errors} />
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>Add </ButtonText>
        </Button>
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
