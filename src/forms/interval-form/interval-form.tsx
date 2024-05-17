import { IntervalSchemaType, intervalSchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { InputForm, Select } from "@/components";
import { Box, Button, ButtonText, HStack, VStack } from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";

import { Controller, useController, useForm } from "react-hook-form";
import { TextInput, TouchableOpacity } from "react-native";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import DatePicker from "react-native-date-picker";

type IntervalFormProps = {
  submitType: "CREATE" | "UPDATE";
  alertId?: string;
  setAlertType?: (value: string) => void;
  initialValue?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    trigger: {
      id: string;
      alertId: string;
    };
  } & IntervalSchemaType;
};

export const IntervalForm = ({
  setAlertType,
  submitType,
  alertId,
  initialValue,
}: IntervalFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntervalSchemaType>({
    defaultValues: {
      title: initialValue?.title,
      subtitle: initialValue?.subtitle,
      body: initialValue?.body,
      trigger: {
        alertType: "INTERVAL",
        hours: initialValue?.trigger.hours,
        minutes: initialValue?.trigger.minutes,
      },
    },
    resolver: zodResolver(intervalSchema),
  });

  const hourInputRef = useRef<TextInput | null>(null);
  const minuteInputRef = useRef<TextInput | null>(null);
  const remedyNameInputRef = useRef<TextInput | null>(null);
  const DoseNameInputRef = useRef<TextInput | null>(null);
  const insctructionsRef = useRef<TextInput | null>(null);

  const { loading, createAlerts, updateAlerts } = useAlertStore();

  const onSubmit = async (data: IntervalSchemaType) => {
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
        render={({ field: { onChange, onBlur, value = "INTERVAL" } }) => (
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
            selectedValue={i18n.t("FROMS.INTERVAL.DROPDOWN")}
          />
        )}
      />

      <HStack space="md" justifyContent="center" alignItems="center">
        <Controller
          control={control}
          name="trigger.hours"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <InputForm
                ref={hourInputRef}
                HelperText={i18n.t("FROMS.INTERVAL.HOUR")}
                ErrorText={errors.trigger?.hours?.message}
                FormControlProps={{
                  isRequired: false,
                  isInvalid: !!errors.trigger?.hours,
                }}
                InputContainerProps={{
                  w: 80,
                }}
                InputProps={{
                  blurOnSubmit: false,
                  onSubmitEditing: () => minuteInputRef.current?.focus(),
                  maxLength: 2,
                  type: "text",
                  onChangeText: (value) => {
                    onChange(Number(value));

                    if (value.length >= 2) {
                      minuteInputRef.current?.focus();
                    }
                  },
                  onBlur: () => onBlur(),
                  value: value.toString(),
                  keyboardType: "numeric",
                  textAlign: "center",
                  placeholder: initialValue?.trigger.hours.toString() ?? "00",
                }}
              />
            );
          }}
        />

        <VStack space="md" mt={8}>
          <Box width={10} height={10} rounded="$full" bgColor="#333" />
          <Box width={10} height={10} rounded="$full" bgColor="#333" />
        </VStack>
        <Controller
          control={control}
          name="trigger.minutes"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <InputForm
                ref={minuteInputRef}
                HelperText={i18n.t("FROMS.INTERVAL.MINUTE")}
                ErrorText={errors.trigger?.minutes?.message}
                FormControlProps={{
                  isInvalid: !!errors.trigger?.minutes,
                  isRequired: false,
                }}
                InputContainerProps={{
                  w: 80,
                }}
                InputProps={{
                  returnKeyType: "next",
                  blurOnSubmit: false,
                  onSubmitEditing: () => remedyNameInputRef.current?.focus(),
                  maxLength: 2,
                  type: "text",
                  onChangeText: (value) => {
                    onChange(Number(value));
                    if (value.length == 0) {
                      hourInputRef.current?.focus();
                    } else if (value.length >= 2) {
                      remedyNameInputRef.current?.focus();
                    }
                  },
                  onBlur: () => onBlur(),
                  value: value.toString(),
                  keyboardType: "numeric",
                  textAlign: "center",
                  placeholder: String(initialValue?.trigger.minutes ?? "00"),
                }}
              />
            );
          }}
        />
      </HStack>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={remedyNameInputRef}
            Label={i18n.t("FROMS.DEFAULT.NAME")}
            ErrorText={errors.title?.message}
            InputProps={{
              onBlur: () => onBlur(),
              onChangeText: (text) => onChange(text),
              value,
              placeholder: initialValue?.title ?? "Dipirona",
              blurOnSubmit: false,
              returnKeyType: "next",
              onSubmitEditing: () => DoseNameInputRef.current?.focus(),
              type: "text",
            }}
            FormControlProps={{
              isInvalid: !!errors.title,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="subtitle"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={DoseNameInputRef}
            Label={i18n.t("FROMS.DEFAULT.DOSE")}
            ErrorText={errors.subtitle?.message}
            FormControlProps={{ isInvalid: !!errors.subtitle }}
            InputProps={{
              blurOnSubmit: false,
              returnKeyType: "next",
              onSubmitEditing: () => insctructionsRef.current?.focus(),
              type: "text",
              placeholder: initialValue?.subtitle ?? "1 pill",
              onChangeText: (text) => onChange(text),
              onBlur: () => onBlur,
              value: value,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({ field: { onChange, onBlur, value = "" } }) => (
          <InputForm
            ref={insctructionsRef}
            Label={i18n.t("FROMS.DEFAULT.INSTRUCTIONS")}
            ErrorText={errors.body?.message}
            FormControlProps={{
              isInvalid: !!errors.body,
            }}
            InputProps={{
              returnKeyType: "done",
              onSubmitEditing: () => handleSubmit(onSubmit),
              type: "text",
              placeholder: initialValue?.body ?? "Take before breakfast",
              onChangeText: (text) => onChange(text),
              onBlur: () => onBlur,
              value: value,
            }}
          />
        )}
      />
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={handleSubmit(onSubmit)}
        mt={8}
      >
        <ButtonText>
          {loading ? loadingText : i18n.t("FROMS.BUTTON")}
        </ButtonText>
      </Button>
    </>
  );
};
