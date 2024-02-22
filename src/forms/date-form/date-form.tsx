import {
  DailySchemaType,
  DateSchemaType,
  dailySchema,
  dateSchema,
} from "@/schema";
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
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";

type DateFormProps = {
  setAlertType: (value: string) => void;
};

export const DateForm = ({ setAlertType }: DateFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DateSchemaType>({
    defaultValues: {
      trigger: {
        alertType: "DATE",
      },
    },
    resolver: zodResolver(dateSchema),
  });

  const { loading, createAlerts } = useAlertStore();

  const onSubmit = async (data: DateSchemaType) => {
    createAlerts(data, reset);
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
              setAlertType(value);
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
              open={open}
              date={date}
              onConfirm={(date) => {
                onChange(date);
                setOpen(false);
                setDate(date);
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
                  placeholder="Date"
                  value={value?.toString()}
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
                type="text"
                placeholder="Dipirona"
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
                type="text"
                placeholder="1 pill"
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
                type="text"
                placeholder="Take before breakfast"
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
        <ButtonText>{loading ? "Creating..." : "Scheluder Alert"}</ButtonText>
      </Button>
      <Text>{`loading is : ${loading}`}</Text>
    </>
  );
};
