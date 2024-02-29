import { IntervalSchemaType, intervalSchema } from "@/schema";
import { useAlertStore } from "@/stores/alert/userAlertStore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  ButtonText,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioLabel,
  Select,
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
import { useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

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

      <HStack space="md" justifyContent="center">
        <Controller
          control={control}
          name="trigger.hours"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={!!errors.trigger?.hours}
                isReadOnly={false}
                isRequired={true}
              >
                <Input height={50} width={70}>
                  <InputField
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => minuteInputRef.current?.focus()}
                    ref={hourInputRef}
                    maxLength={2}
                    type="text"
                    onChangeText={(value) => {
                      onChange(Number(value));

                      if (value.length >= 2) {
                        minuteInputRef.current?.focus();
                      }
                    }}
                    onBlur={onBlur}
                    value={value.toString()}
                    keyboardType="numeric"
                    textAlign="center"
                    placeholder={initialValue?.trigger.hours.toString() ?? "00"}
                  />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Hour</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                  <FormControlErrorText>
                    {errors.trigger?.hours?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
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
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={!!errors.trigger?.minutes}
                isReadOnly={false}
                isRequired={true}
              >
                <Input height={50} width={70}>
                  <InputField
                    returnKeyType="next"
                    ref={minuteInputRef}
                    blurOnSubmit={false}
                    onSubmitEditing={() => remedyNameInputRef.current?.focus()}
                    maxLength={2}
                    type="text"
                    onChangeText={(value) => {
                      onChange(Number(value));
                      if (value.length == 0) {
                        hourInputRef.current?.focus();
                      } else if (value.length >= 2) {
                        remedyNameInputRef.current?.focus();
                      }
                    }}
                    onBlur={onBlur}
                    value={value.toString()}
                    keyboardType="numeric"
                    textAlign="center"
                    placeholder={String(initialValue?.trigger.minutes ?? "00")}
                  />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Minute</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                  <FormControlErrorText>
                    {errors.trigger?.minutes?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            );
          }}
        />

        <RadioGroup borderColor="$blue900">
          <Radio value="AM" size="md" isInvalid={false} isDisabled={false}>
            <RadioLabel>AM</RadioLabel>
          </Radio>
          <Divider />
          <Radio value="PM" size="md" isInvalid={false} isDisabled={false}>
            <RadioLabel>PM</RadioLabel>
          </Radio>
        </RadioGroup>
      </HStack>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value = "" } }) => (
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
        render={({ field: { onChange, onBlur, value = "" } }) => (
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
        render={({ field: { onChange, onBlur, value = "" } }) => (
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
