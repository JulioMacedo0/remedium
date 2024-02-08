import { Alert } from "@/schema";
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
import { Fragment } from "react";
import { FieldErrors, useForm, Controller } from "react-hook-form";

type ICommomFormProps = {
  control: ReturnType<typeof useForm<Alert>>["control"];
  errors: FieldErrors<Alert>;
};

export const CommomForm = ({ control, errors }: ICommomFormProps) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
