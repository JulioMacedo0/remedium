import { ButtonText, Button as UiButton } from "@gluestack-ui/themed";

import { ComponentProps } from "react";
import LottieView from "lottie-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants";
type ButtonProps = {
  text: string;
  loading: boolean;
} & ComponentProps<typeof UiButton>;

export const Button = ({ text, loading, ...rest }: ButtonProps) => {
  const theme = useTheme<Theme>();
  const { brandColor } = theme.colors;

  return (
    <UiButton {...rest} disabled={loading} bg={brandColor}>
      {!loading ? (
        <ButtonText>{text}</ButtonText>
      ) : (
        <LottieView
          style={{
            width: 200,
            height: 200,
          }}
          colorFilters={[
            { keypath: "Shape Layer 1", color: "#fff" },
            { keypath: "Shape Layer 2", color: "#fff" },
            { keypath: "Shape Layer 3", color: "#fff" },
            { keypath: "Shape Layer 4", color: "#fff" },
          ]}
          autoPlay
          source={require("@lotties/loading.json")}
        />
      )}
    </UiButton>
  );
};
