import { DailySchemaType, dailySchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { Select } from "@/components";
import {
  Button,
  ButtonText,
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
  const DoseNameInputRef = useRef<TextInput | null>(null);
  const insctructionsRef = useRef<TextInput | null>(null);
  const { loading, createAlerts, updateAlerts } = useAlertStore();

  const onSubmit = async (data: DailySchemaType) => {
    if (submitType == "CREATE") {
      console.log(data);
      createAlerts(data, reset);
    } else if (submitType == "UPDATE") {
      if (!alertId) return;
      updateAlerts(data, reset, alertId);
    }
  };

  const loadingText =
    submitType == "CREATE" ? "Creating alert..." : "Updateing alert...";

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
            selectedValue={value}
          />
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
              <FormControlLabelText>Date</FormControlLabelText>
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

      <Controller
        control={control}
        name="title"
        render={({
          field: { onChange, onBlur, value = initialValue?.title ?? "" },
        }) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={!!errors.title}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Remedy name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                ref={remedyNameInputRef}
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => DoseNameInputRef.current?.focus()}
                type="text"
                placeholder={initialValue?.title ?? "Dipirona"}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input>
            <FormControlError>
              {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
              <FormControlErrorText>
                {errors.title?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="subtitle"
        render={({
          field: { onChange, onBlur, value = initialValue?.subtitle ?? "" },
        }) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={!!errors.subtitle}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Dose</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                ref={DoseNameInputRef}
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => insctructionsRef.current?.focus()}
                type="text"
                placeholder={initialValue?.subtitle ?? "1 pill"}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            {/* <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
            <FormControlError>
              {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
              <FormControlErrorText>
                {errors.subtitle?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({
          field: { onChange, onBlur, value = initialValue?.body ?? "" },
        }) => (
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={!!errors.body}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText>Instructions</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                ref={insctructionsRef}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                type="text"
                placeholder={initialValue?.body ?? "Take before breakfast"}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            {/* <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
            <FormControlError>
              {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
              <FormControlErrorText>
                {errors.body?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
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
        <ButtonText>{loading ? loadingText : "Scheluder Alert"}</ButtonText>
      </Button>
    </>
  );
};
