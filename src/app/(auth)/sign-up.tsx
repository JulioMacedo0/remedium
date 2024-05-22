import { Button, InputForm, Screen } from "@/components";
import { Theme } from "@/constants";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  KeyboardAvoidingView,
  ScrollView,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { Link, router } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

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

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const { loading, signUp } = useAuthStore();

  const nameInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  const succesCallback = () => {
    reset();
    router.replace("/(auth)/sign-in");
  };

  const onSubmit = async (data: SignUpSchemaType) => {
    signUp(data, succesCallback);
  };

  const theme = useTheme<Theme>();
  const { brandColor, mainBackground } = theme.colors;
  const i18n = useI18nStore((state) => state.i18n);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainBackground }}>
      <Screen>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <InputForm
                  ref={nameInputRef}
                  Label={i18n.t("SIGN-UP.FORM.NAME")}
                  ErrorText={errors.username?.message}
                  FormControlProps={{
                    isInvalid: !!errors.username,
                    isRequired: true,
                  }}
                  InputProps={{
                    returnKeyType: "next",
                    blurOnSubmit: false,
                    onSubmitEditing: () => emailInputRef.current?.focus(),
                    type: "text",
                    placeholder: i18n.t("SIGN-UP.FORM.NAME_PLACEHOLDER"),
                    onChangeText: (text) => onChange(text),
                    onBlur: () => onBlur(),
                    value: value,
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <InputForm
                  ref={emailInputRef}
                  Label={i18n.t("SIGN-UP.FORM.EMAIL")}
                  ErrorText={errors.email?.message}
                  FormControlProps={{
                    isInvalid: !!errors.email,
                    isRequired: true,
                  }}
                  InputProps={{
                    returnKeyType: "next",
                    blurOnSubmit: false,
                    onSubmitEditing: () => passwordInputRef.current?.focus(),
                    type: "text",
                    placeholder: i18n.t("SIGN-UP.FORM.EMAIL_PLACEHOLDER"),
                    onChangeText: (text) => onChange(text),
                    onBlur: () => onBlur(),
                    value: value,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <InputForm
                  ref={passwordInputRef}
                  Label={i18n.t("SIGN-UP.FORM.PASSWORD")}
                  ErrorText={errors.password?.message}
                  FormControlProps={{
                    isInvalid: !!errors.password,
                    isRequired: true,
                  }}
                  InputProps={{
                    returnKeyType: "done",
                    blurOnSubmit: false,
                    type: "password",
                    placeholder: i18n.t("SIGN-UP.FORM.PASSWORD_PLACEHOLDER"),
                    onChangeText: (text) => onChange(text),
                    onBlur: () => onBlur(),
                    value: value,
                    onSubmitEditing: handleSubmit(onSubmit),
                  }}
                />
              )}
            />

            <Button
              loading={loading}
              text={i18n.t("SIGN-UP.BUTTON")}
              onPress={handleSubmit(onSubmit)}
            />

            <Link
              style={{
                textAlign: "right",
                color: brandColor,
                marginTop: 12,
              }}
              replace
              href="/sign-in"
            >
              {i18n.t("SIGN-UP.HAVEACC")}
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </SafeAreaView>
  );
};

export default SignUp;
