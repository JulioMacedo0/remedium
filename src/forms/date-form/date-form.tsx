import { DateSchemaType, dateSchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { format } from "date-fns";
import { InputForm, Select } from "@/components";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import DatePicker from "react-native-date-picker";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { DefaultForm } from "../default-form/default-form";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

type DateFormProps = {
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
  } & DateSchemaType;
};

export const DateForm = ({
  setAlertType,
  initialValue,
  submitType,
  alertId,
}: DateFormProps) => {
  const initialDate = new Date(
    !!initialValue?.trigger.date ? initialValue?.trigger.date : Date.now()
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DateSchemaType>({
    defaultValues: {
      title: initialValue?.title,
      subtitle: initialValue?.subtitle,
      body: initialValue?.body,
      trigger: {
        alertType: "DATE",
        date: initialDate.toISOString(),
      },
    },
    resolver: zodResolver(dateSchema),
  });

  const { createAlerts, updateAlerts } = useAlertStore();

  const onSubmit = async (data: DateSchemaType) => {
    if (submitType == "CREATE") {
      createAlerts(data, reset);
    } else if (submitType == "UPDATE") {
      if (!alertId) return;
      updateAlerts(data, reset, alertId);
    }
  };

  const remedyNameInputRef = useRef<TextInput | null>(null);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const i18n = useI18nStore((state) => state.i18n);

  return (
    <>
      <Controller
        control={control}
        name="trigger.alertType"
        render={({ field: { onChange, onBlur, value = "DATE" } }) => (
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
            selectedValue={i18n.t("FORMS.ONE_TIME.DROPDOWN")}
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
              Label={i18n.t("FORMS.ONE_TIME.DATE")}
              ErrorText={errors.trigger?.date?.message}
              FormControlProps={{
                isInvalid: !!errors.trigger?.date,
                isRequired: true,
              }}
              InputProps={{
                editable: false,
                type: "text",
                placeholder: !!initialValue?.trigger.date
                  ? format(initialValue?.trigger.date, "Pp")
                  : "Date",

                value: format(value, "Pp"),
                onChangeText: () => onChange(),
                onBlur: () => onBlur(),
              }}
            />
          </TouchableOpacity>
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
