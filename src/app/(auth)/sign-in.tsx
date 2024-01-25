import React from "react";
import {
  InputSection,
  StyledTextInput,
  Text,
  ThemedStatusBar,
  View,
} from "@/components";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const SignIn = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <InputSection
            title="Email"
            style={{ backgroundColor: "transparent" }}
          >
            <StyledTextInput placeholder="put your email...." />
          </InputSection>
          <InputSection
            title="Password"
            style={{ backgroundColor: "transparent" }}
          >
            <StyledTextInput placeholder="put your password...." />
          </InputSection>

          <Button text="sign in" onPress={() => console.log("press")} />
          <Link
            style={{
              width: "80%",
              color: "blue",
              textAlign: "right",
            }}
            replace
            href="/(auth)/sign-up"
          >
            Dont have account?
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
