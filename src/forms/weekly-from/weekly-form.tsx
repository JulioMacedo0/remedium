import { WeeklySchemaType, weeklySchema } from "@/schema";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

type WeeklyFormProps = {
  setAlertType: (value: string) => void;
};

export const WeeklyForm = ({ setAlertType }: WeeklyFormProps) => {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const ref = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklySchemaType>({
    defaultValues: {
      trigger: {
        alertType: "WEEKLY",
      },
    },
    resolver: zodResolver(weeklySchema),
  });

  const onSubmit = (data: WeeklySchemaType) => {
    console.log(data);
  };

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
        name="trigger.week"
        render={({ field: { onChange, onBlur, value } }) => (
          <CheckboxGroup
            rounded="$full"
            borderWidth={1}
            isInvalid={!!errors.trigger?.week}
            value={value}
            mb={12}
            flexDirection="row"
            justifyContent="space-around"
            onChange={onChange}
          >
            <Checkbox
              p={4}
              aria-label="MONDAY"
              value="MONDAY"
              isInvalid={false}
              isDisabled={false}
            >
              <CheckboxLabel>Mon</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="TUESDAY"
              value="TUESDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Tue</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="WEDNESDAY"
              value="WEDNESDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Wed</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="THURSDAY"
              value="THURSDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Thu</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="FRIDAY"
              value="FRIDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Fri</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="SATURDAY"
              value="SATURDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Sat</CheckboxLabel>
            </Checkbox>
            <Checkbox
              aria-label="SUNDAY"
              value="SUNDAY"
              size="md"
              isInvalid={false}
              isDisabled={false}
            >
              {/* <CheckboxIndicator mr="$2">
                <AntDesign name="close" size={24} color="black" />
              </CheckboxIndicator> */}
              <CheckboxLabel>Sun</CheckboxLabel>
            </Checkbox>
          </CheckboxGroup>
        )}
      />

      <HStack space="md" justifyContent="center">
        <Controller
          control={control}
          name="trigger.hour"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={!!errors.trigger?.hour}
                isReadOnly={false}
                isRequired={true}
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
                    {errors.trigger?.hour?.message}
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
          name="trigger.minute"
          render={({ field: { onChange, onBlur, value = "" } }) => {
            return (
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={!!errors.trigger?.minute}
                isReadOnly={false}
                isRequired={true}
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
                  <FormControlHelperText>Minute</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                  <FormControlErrorText>
                    {errors.trigger?.minute?.message}
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
              <FormControlLabelText>Title</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Title"
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
              <FormControlLabelText>Subtitle</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Subtitle"
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
              <FormControlLabelText>Body</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Body"
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
      >
        <ButtonText>Scheluder Alert</ButtonText>
      </Button>
    </>
  );
};
