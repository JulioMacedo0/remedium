import React from "react";
import { InputSection, StyledTextInput, Text, View } from "@/components";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "@/components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const SignOut = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
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
            <StyledTextInput placeholder="put your username...." />
          </InputSection>
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
            <StyledTextInput
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
    </SafeAreaView>
  );
};

export default SignOut;
