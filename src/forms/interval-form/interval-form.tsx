import { IntervalSchemaType, intervalSchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { InputForm, Select } from "@/components";
import { Box, Button, ButtonText, HStack, VStack } from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import { DefaultForm } from "../default-form/default-form";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants";

type IntervalFormProps = {
  submitType: "CREATE" | "UPDATE";
  alertId?: string;
  setAlertType?: (value: string) => void;
  initialValue?: IntervalSchemaType;
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

  const { createAlerts, updateAlerts } = useAlertStore();

  const onSubmit = async (data: IntervalSchemaType) => {
    if (submitType == "CREATE") {
      createAlerts(data, reset);
    } else if (submitType == "UPDATE") {
      if (!alertId) return;
      updateAlerts(data, reset, alertId);
    }
  };

  const i18n = useI18nStore((state) => state.i18n);

  const theme = useTheme<Theme>();
  const { brandColor } = theme.colors;
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
            selectedValue={i18n.t("FORMS.INTERVAL.DROPDOWN")}
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
                HelperText={i18n.t("FORMS.INTERVAL.HOUR")}
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

        <VStack space="md">
          <Box width={10} height={10} rounded="$full" bgColor={brandColor} />
          <Box width={10} height={10} rounded="$full" bgColor={brandColor} />
        </VStack>

        <Controller
          control={control}
          name="trigger.minutes"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <InputForm
                ref={minuteInputRef}
                HelperText={i18n.t("FORMS.INTERVAL.MINUTE")}
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
