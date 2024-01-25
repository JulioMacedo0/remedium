import React from "react";
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

const SignOut = () => {
  const { theme } = useTheme();
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

            <Button text="sign up" onPress={() => console.log("press")} />
            <Link
              style={{
                width: "80%",
                color: "blue",
                textAlign: "right",
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
