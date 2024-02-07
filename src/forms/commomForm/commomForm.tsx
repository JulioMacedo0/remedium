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

export const CommomForm = () => {
  return (
    <Fragment>
      <FormControl
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Title</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField type="text" placeholder="Title" />
        </Input>
        {/* <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
        <FormControlError>
          {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
          <FormControlErrorText>
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Subtitle</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField type="text" placeholder="Subtitle" />
        </Input>
        {/* <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
        <FormControlError>
          {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
          <FormControlErrorText>
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Body</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField type="text" placeholder="Body" />
        </Input>
        {/* <FormControlHelper>
          <FormControlHelperText>
            Must be at least 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}
        <FormControlError>
          {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
          <FormControlErrorText>
            At least 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
    </Fragment>
  );
};
