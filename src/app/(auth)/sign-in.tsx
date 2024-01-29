import { useRef, useState } from "react";
import { InputSection, ThemedStatusBar, View } from "@/components";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { KeyboardAvoidingView, ToastAndroid } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useTheme } from "@/context";
import { Colors } from "@/constants";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const SignIn = () => {
  const { theme } = useTheme();

  const loading = useAuthStore((set) => set.loading);
  const signIn = useAuthStore((set) => set.signIn);
  const error = useAuthStore((set) => set.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef<TextInput | null>(null);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors[theme].tabBackground,
      }}
    >
      <ThemedStatusBar />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <InputSection title="Email">
              <TextInput
                defaultValue={email}
                onChangeText={(value) => setEmail(value)}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                style={{
                  textAlign: "center",
                  borderRadius: 999,
                  padding: 12,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                placeholder="put your email...."
              />
            </InputSection>
            <InputSection
              title="Password"
              style={{ backgroundColor: "transparent" }}
            >
              <TextInput
                defaultValue={password}
                onChangeText={(value) => setPassword(value)}
                ref={passwordInputRef}
                secureTextEntry
                style={{
                  textAlign: "center",
                  borderRadius: 999,
                  padding: 12,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                placeholder="put your password...."
              />
            </InputSection>

            <Button
              text={loading ? "loading..." : "sign in"}
              onPress={() => signIn({ email, password })}
            />
            <Link
              style={{
                width: "80%",
                fontWeight: "bold",
                textAlign: "right",
                color: Colors[theme].tabBarActiveTintColor,
              }}
              replace
              href="/(auth)/sign-up"
            >
              Dont have account?
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
