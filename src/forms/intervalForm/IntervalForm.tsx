import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  Text,
  Box,
  HStack,
  VStack,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { CommomForm } from "../commomForm";
import { Divider } from "@gluestack-ui/themed";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { Alert, intervalAlertType } from "@/schema";

type IntervalFormProps = {
  control: ReturnType<typeof useForm<Alert>>["control"];
  errors: FieldErrors<Alert>;
};

export const IntervalForm = ({ control, errors }: IntervalFormProps) => {
  return (
    <React.Fragment>
      <HStack space="md" justifyContent="center">
        <Controller
          control={control}
          name="trigger.hour"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={!!errors.trigger}
                isReadOnly={false}
                isRequired={false}
              >
                <Input height={50} width={70}>
                  <InputField
                    type="text"
                    onChangeText={(value) => onChange(Number(value))}
                    onBlur={onBlur}
                    value={value.toString()}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Hour</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                  <FormControlErrorText>
                    {errors.trigger?.message}
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

        <FormControl
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
        >
          <Input height={50} width={70}>
            <InputField type="text" maxLength={2} />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>Minute</FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

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

      <CommomForm control={control} errors={errors} />
    </React.Fragment>
  );
};
