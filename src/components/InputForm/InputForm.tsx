import { GluestackFormControlProps, GluestackInputProps } from "@/types";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { ComponentProps, forwardRef } from "react";

type InputFormProps = {
  InputProps: GluestackInputProps;
  FormControlProps: GluestackFormControlProps;
  Label: string;
  ErrorText?: string;
};

export const InputForm = forwardRef<GluestackInputProps, InputFormProps>(
  ({ Label, ErrorText, FormControlProps, InputProps }, ref) => (
    <FormControl
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={true}
      {...FormControlProps}
    >
      <FormControlLabel>
        <FormControlLabelText>{Label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField ref={ref} {...InputProps} />
      </Input>
      <FormControlError>
        <FormControlErrorText>{ErrorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
);
