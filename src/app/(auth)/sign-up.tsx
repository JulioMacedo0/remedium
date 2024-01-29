import React, { useState } from "react";
import {
  InputSection,
  StyledTextInput,
  Text,
  ThemedStatusBar,
  View,
} from "@/components";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Button } from "@/components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants";
import { useTheme } from "@/context";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const SignOut = () => {
  const { theme } = useTheme();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useAuthStore((set) => set.loading);
  const signUp = useAuthStore((set) => set.signUp);
  const error = useAuthStore((set) => set.error);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setUserName("");
  };
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
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <InputSection
              title="Username"
              style={{ backgroundColor: "transparent" }}
            >
              <TextInput
                defaultValue={userName}
                onChangeText={(value) => setUserName(value)}
                style={{
                  textAlign: "center",
                  borderRadius: 999,
                  padding: 12,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                placeholder="put your username...."
              />
            </InputSection>
            <InputSection
              title="Email"
              style={{ backgroundColor: "transparent" }}
            >
              <TextInput
                defaultValue={email}
                onChangeText={(value) => setEmail(value)}
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
                style={{
                  textAlign: "center",
                  borderRadius: 999,
                  padding: 12,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                secureTextEntry
                placeholder="put your password...."
              />
            </InputSection>

            <Button
              text="sign up"
              onPress={async () => {
                const httpStatus = await signUp({
                  email,
                  password,
                  username: userName,
                });

                if (httpStatus == 201) {
                  clearForm();
                }
              }}
            />
            <Link
              style={{
                width: "80%",
                fontWeight: "bold",
                textAlign: "right",
                color: Colors[theme].text,
              }}
              replace
              href="/(auth)/sign-in"
            >
              have account?
            </Link>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignOut;
