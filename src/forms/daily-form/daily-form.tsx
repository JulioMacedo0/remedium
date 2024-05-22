import { DailySchemaType, dailySchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { Select, Button, InputForm } from "@/components";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import DatePicker from "react-native-date-picker";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { TextInput, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { DefaultForm } from "../default-form/default-form";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

type DailyFormProps = {
  submitType: "CREATE" | "UPDATE";
  alertId?: string;
  setAlertType?: (value: string) => void;
  initialValue?: DailySchemaType;
};

export const DailyForm = ({
  setAlertType,
  initialValue,
  submitType,
  alertId,
}: DailyFormProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const initialDate = new Date(
    !!initialValue?.trigger.date ? initialValue?.trigger.date : Date.now()
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DailySchemaType>({
    defaultValues: {
      title: initialValue?.title,
      subtitle: initialValue?.subtitle,
      body: initialValue?.body,
      trigger: {
        alertType: "DAILY",
        date: initialDate.toISOString(),
        hours: 0,
        minutes: 0,
      },
    },
    resolver: zodResolver(dailySchema),
  });

  const remedyNameInputRef = useRef<TextInput | null>(null);

  const { createAlerts, updateAlerts } = useAlertStore();

  const i18n = useI18nStore((state) => state.i18n);

  const onSubmit = async (data: DailySchemaType) => {
    if (submitType == "CREATE") {
      console.log(data);
      createAlerts(data, reset);
    } else if (submitType == "UPDATE") {
      if (!alertId) return;
      updateAlerts(data, reset, alertId);
    }
  };

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
              if (!!setAlertType) {
                setAlertType(value);
              }

              onChange(value);
            }}
            onClose={onBlur}
            selectedValue={i18n.t("FORMS.DAILY.DROPDOWN")}
          />
        )}
      />

      <Controller
        control={control}
        name="trigger.date"
        render={({ field: { onChange, onBlur, value } }) => (
          <TouchableOpacity onPress={() => setOpen(true)}>
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
            <InputForm
              ref={remedyNameInputRef}
              Label={i18n.t("FORMS.DAILY.DATE")}
              ErrorText={errors.trigger?.date?.message}
              FormControlProps={{
                isInvalid: !!errors.trigger?.date,
                isRequired: true,
              }}
              InputProps={{
                editable: false,
                type: "text",
                placeholder: !!initialValue?.trigger.date
                  ? format(initialValue?.trigger.date, "p")
                  : "Date",

                value: format(value, "p"),
                onChangeText: () => onChange(),
                onBlur: () => onBlur(),
              }}
            />
          </TouchableOpacity>
          // <FormControl
          //   size="md"
          //   isDisabled={false}
          //   isInvalid={!!errors.trigger?.date}
          //   isReadOnly={false}
          //   isRequired={true}
          // >
          //   <FormControlLabel>
          //     <FormControlLabelText>Date</FormControlLabelText>
          //   </FormControlLabel>
          //   <DatePicker
          //     modal
          //     mode="time"
          //     open={open}
          //     date={date}
          //     onConfirm={(date) => {
          //       onChange(date.toISOString());
          //       setOpen(false);
          //       setDate(date);
          //       remedyNameInputRef.current?.focus();
          //     }}
          //     onCancel={() => {
          //       setOpen(false);
          //     }}
          //   />

          //   <TouchableOpacity onPress={() => setOpen(true)}>
          //     <Input pointerEvents="none">
          //       <InputField
          //         editable={false}
          //         type="text"
          //         placeholder={
          //           !!initialValue?.trigger.date
          //             ? format(initialValue?.trigger.date, "p")
          //             : "Date"
          //         }
          //         value={format(value, "p")}
          //         onChangeText={onChange}
          //         onBlur={onBlur}
          //       />
          //     </Input>
          //   </TouchableOpacity>
          //   <FormControlError>
          //     {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
          //     <FormControlErrorText>
          //       {errors.trigger?.date?.message}
          //     </FormControlErrorText>
          //   </FormControlError>
          // </FormControl>
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
