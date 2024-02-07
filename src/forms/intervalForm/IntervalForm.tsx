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
} from "@gluestack-ui/themed";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { CommomForm } from "../commomForm";

export const IntervalForm = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  return (
    <React.Fragment>
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Click me</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">ENTER TIME</Heading>
            <AlertDialogCloseButton>
              <MaterialIcons name="close" size={24} color="black" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody alignContent="center">
            <HStack space="md" alignContent="center">
              <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
              >
                <Input height={50} width={70}>
                  <InputField type="text" />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Hour</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                  <FormControlErrorText>
                    At least 6 characters are required.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              <VStack space="md">
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
            </HStack>
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="space-between">
            <MaterialIcons name="access-time" size={24} color="black" />
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$success400"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>OK</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CommomForm />
    </React.Fragment>
  );
};
