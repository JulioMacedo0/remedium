import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  KeyboardAvoidingView,
  ScrollView,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
const SignUp = () => {
  const signUpSchema = z.object({
    username: z
      .string({ required_error: "field name is required" })
      .min(1, { message: "field name is required" })
      .trim(),
    email: z
      .string({ required_error: "field email is required" })
      .email({
        message: "Invalid email",
      })
      .toLowerCase()
      .trim(),
    password: z
      .string({ required_error: "field password is required" })
      .min(8, { message: "the password must contain at least 8 characters" })
      .trim(),
  });

  type SignUpSchemaType = z.infer<typeof signUpSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} p={8}>
        <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
          <Heading textAlign="center">Sign up</Heading>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={!!errors.username}
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    placeholder="Put your name"
                    returnKeyType="send"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {errors.username?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={!!errors.email}
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    placeholder="Put your email"
                    returnKeyType="send"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {errors.email?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={!!errors.password?.message}
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    placeholder="Put your password"
                    returnKeyType="next"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {errors.password?.message}
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
            <ButtonText>{"sig up"}</ButtonText>
          </Button>
          <Link
            style={{
              textAlign: "right",
              color: "blue",
            }}
            replace
            href="/sign-in"
          >
            have account?
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
