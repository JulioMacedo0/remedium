import { ButtonText, Button as UiButton } from "@gluestack-ui/themed";

import { ComponentProps } from "react";
import LottieView from "lottie-react-native";
type ButtonProps = {
  text: string;
  loading: boolean;
} & ComponentProps<typeof UiButton>;

export const Button = ({ text, loading, ...rest }: ButtonProps) => {
  return (
    <UiButton {...rest} disabled={loading}>
      {!loading ? (
        <ButtonText>{text}</ButtonText>
      ) : (
        <LottieView
          style={{
            width: 200,
            height: 200,
          }}
          autoPlay
          source={require("@lotties/loading.json")}
        />
      )}
    </UiButton>
  );
};
