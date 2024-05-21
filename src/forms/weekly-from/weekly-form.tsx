import { WeeklySchemaType, weeklySchema } from "@/schema";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";
import { Select } from "@/components";
import {
  Button,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxLabel,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { TextInput, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { DefaultForm } from "../default-form/default-form";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

type WeeklyFormProps = {
  submitType: "CREATE" | "UPDATE";
  alertId?: string;
  setAlertType?: (value: string) => void;
  initialValue?: WeeklySchemaType;
};

export const WeeklyForm = ({
  setAlertType,
  submitType,
  alertId,
  initialValue,
}: WeeklyFormProps) => {
  const initialDate = new Date(
    !!initialValue?.trigger.date ? initialValue?.trigger.date : Date.now()
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WeeklySchemaType>({
    defaultValues: {
      title: initialValue?.title,
      subtitle: initialValue?.subtitle,
      body: initialValue?.body,
      trigger: {
        alertType: "WEEKLY",
        date: initialDate.toISOString(),
        hours: 0,
        minutes: 0,
        week: initialValue?.trigger.week,
      },
    },
    resolver: zodResolver(weeklySchema),
  });
  const { loading, createAlerts, updateAlerts } = useAlertStore();

  const remedyNameInputRef = useRef<TextInput | null>(null);
  const DoseNameInputRef = useRef<TextInput | null>(null);
  const insctructionsRef = useRef<TextInput | null>(null);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onSubmit = (data: WeeklySchemaType) => {
    if (submitType == "CREATE") {
      createAlerts(data, reset);
    } else if (submitType == "UPDATE") {
      if (!alertId) return;
      updateAlerts(data, reset, alertId);
    }
  };

  const loadingText =
    submitType == "CREATE" ? "Creating alert..." : "Updateing alert...";

  const i18n = useI18nStore((state) => state.i18n);
  return (
    <>
      <Controller
        control={control}
        name="trigger.alertType"
        render={({ field: { onChange, onBlur, value = "WEEKLY" } }) => (
          <Select
            isRequired
            isInvalid={!!errors.trigger?.alertType?.message}
            onValueChange={(value) => {
              if (setAlertType) {
                setAlertType(value);
              }

              onChange(value);
            }}
            onClose={onBlur}
            selectedValue={i18n.t("FORMS.WEEKLY.DROPDOWN")}
          />
        )}
      />

      <Controller
        control={control}
        name="trigger.week"
        render={({ field: { onChange, value = [] } }) => (
          <VStack mb={12}>
            <CheckboxGroup
              overflow="hidden"
              rounded="$full"
              borderWidth={1}
              isInvalid={!!errors.trigger?.week}
              value={value}
              flexDirection="row"
              onChange={onChange}
            >
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="MONDAY"
                value="MONDAY"
                isInvalid={false}
                isDisabled={false}
                p={4}
                bgColor={
                  !!value.find((value) => value == "MONDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "MONDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  {i18n.t("FORMS.WEEKLY.WEEK_SELECT.MON")}
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="TUESDAY"
                value="TUESDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "TUESDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "TUESDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Tue
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="WEDNESDAY"
                value="WEDNESDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "WEDNESDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "WEDNESDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Wed
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="THURSDAY"
                value="THURSDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "THURSDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "THURSDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Thu
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="FRIDAY"
                value="FRIDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "FRIDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "FRIDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Fri
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="SATURDAY"
                value="SATURDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "SATURDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "SATURDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Sat
                </CheckboxLabel>
              </Checkbox>
              <Checkbox
                justifyContent="center"
                flex={1}
                aria-label="SUNDAY"
                value="SUNDAY"
                size="md"
                isInvalid={false}
                isDisabled={false}
                bgColor={
                  !!value.find((value) => value == "SUNDAY")
                    ? "$green400"
                    : "transparent"
                }
              >
                {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
                <CheckboxLabel
                  color={
                    !!value.find((value) => value == "SUNDAY")
                      ? "$white"
                      : "$coolGray500"
                  }
                >
                  Sun
                </CheckboxLabel>
              </Checkbox>
            </CheckboxGroup>
            {!!errors.trigger?.week?.message && (
              <Text color="$red600" fontSize="$sm">
                {errors.trigger?.week?.message}
              </Text>
            )}
          </VStack>
        )}
      />
      <Controller
        control={control}
        name="trigger.date"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={!!errors.trigger?.date}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>
                {i18n.t("FORMS.WEEKLY.DATE")}
              </FormControlLabelText>
            </FormControlLabel>
            <DatePicker
              modal
              mode="time"
              open={open}
              date={date}
              onConfirm={(date) => {
                onChange(date.toISOString());
                setOpen(false);
                setDate(date);
                remedyNameInputRef.current?.focus();
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <TouchableOpacity onPress={() => setOpen(true)}>
              <Input pointerEvents="none">
                <InputField
                  editable={false}
                  type="text"
                  placeholder={
                    !!initialValue?.trigger.date
                      ? format(initialValue?.trigger.date, "p")
                      : "Date"
                  }
                  value={format(value, "p")}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
            </TouchableOpacity>
            <FormControlError>
              {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
              <FormControlErrorText>
                {errors.trigger?.date?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <DefaultForm
        control={control}
        errors={errors}
        initialValue={initialValue}
        onSubmitEditing={handleSubmit(onSubmit)}
        remedyNameInputRef={remedyNameInputRef}
      />
    </>
  );
};
