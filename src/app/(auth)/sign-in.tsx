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
const SignIn = () => {
  const signInSchema = z.object({
    email: z
      .string({ required_error: "field email is required" })
      .email({
        message: "Invalid email",
      })
      .toLowerCase()
      .trim(),
    password: z
      .string({ required_error: "field password is required" })
      .min(1, { message: "field password is required" })
      .trim(),
  });

  type SignInSchemaType = z.infer<typeof signInSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchemaType) => {
    console.log(data);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} p={8}>
        <ScrollView>
          <Heading textAlign="center">Sign in</Heading>

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
            <ButtonText>{"login"}</ButtonText>
          </Button>

          <Link
            style={{
              textAlign: "right",
              color: "blue",
            }}
            replace
            href="/sign-up"
          >
            Dont have account?
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
