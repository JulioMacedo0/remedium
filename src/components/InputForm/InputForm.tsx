import {
  GluestackFormControlProps,
  GluestackInpuProps,
  GluestackInputFieldProps,
} from "@/types";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { forwardRef } from "react";
import { TextInput } from "react-native";

type InputFormProps = {
  InputContainerProps?: GluestackInpuProps;
  InputProps: GluestackInputFieldProps;
  FormControlProps: GluestackFormControlProps;
  Label?: string;
  ErrorText?: string;
  HelperText?: string;
};

export const InputForm = forwardRef<TextInput, InputFormProps>(
  (
    {
      Label,
      ErrorText,
      HelperText,
      FormControlProps,
      InputProps,
      InputContainerProps,
    },
    ref
  ) => (
    <FormControl
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={true}
      mb={12}
      {...FormControlProps}
    >
      <FormControlLabel>
        <FormControlLabelText>{Label}</FormControlLabelText>
      </FormControlLabel>
      <Input {...InputContainerProps}>
        <InputField ref={ref} {...InputProps} />
      </Input>

      {HelperText && (
        <FormControlHelper>
          <FormControlHelperText>{HelperText}</FormControlHelperText>
        </FormControlHelper>
      )}

      {ErrorText && (
        <FormControlError>
          <FormControlErrorText>{ErrorText}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
);
