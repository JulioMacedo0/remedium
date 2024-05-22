import { Button, InputForm, Screen } from "@/components";
import { Theme } from "@/constants";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import {
  Heading,
  KeyboardAvoidingView,
  ScrollView,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { Link } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

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

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  const { loading, signIn } = useAuthStore();

  const onSubmit = async (data: SignInSchemaType) => {
    signIn(data, reset);
  };

  const theme = useTheme<Theme>();
  const { brandColor } = theme.colors;
  const i18n = useI18nStore((state) => state.i18n);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <InputForm
                  ref={emailInputRef}
                  Label={i18n.t("SIGN-IN.FORM.EMAIL")}
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
                    placeholder: i18n.t("SIGN-IN.FORM.EMAIL_PLACEHOLDER"),
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
                  Label={i18n.t("SIGN-IN.FORM.PASSWORD")}
                  ErrorText={errors.password?.message}
                  FormControlProps={{
                    isInvalid: !!errors.password?.message,
                    isRequired: true,
                  }}
                  InputProps={{
                    blurOnSubmit: false,
                    type: "password",
                    placeholder: i18n.t("SIGN-IN.FORM.PASSWORD_PLACEHOLDER"),
                    returnKeyType: "done",
                    onChangeText: (text) => onChange(text),
                    onBlur: () => onBlur(),
                    value,
                    onSubmitEditing: () => handleSubmit(onSubmit),
                  }}
                />
              )}
            />

            <Button
              loading={loading}
              text={i18n.t("SIGN-IN.BUTTON")}
              onPress={handleSubmit(onSubmit)}
            />

            <Link
              style={{
                textAlign: "right",
                color: brandColor,
                marginTop: 12,
              }}
              replace
              href="/sign-up"
            >
              {i18n.t("SIGN-IN.DONTACC")}
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </SafeAreaView>
  );
};

export default SignIn;
