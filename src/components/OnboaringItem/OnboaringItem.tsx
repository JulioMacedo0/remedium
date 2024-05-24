import { TOnboardingData } from "@/constants";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { Center } from "@gluestack-ui/themed";
import { OnboaringButton } from "../OnboaringButton/OnboaringButton";

type OnboaringItemProps = {
  item: TOnboardingData;
};

export const OnboaringItem = ({ item }: OnboaringItemProps) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: item.backgroundColor,
        },
      ]}
    >
      <LottieView
        style={{
          marginTop: 15,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.4,
        }}
        resizeMode="contain"
        autoPlay
        source={item.image}
      />

      <Text
        style={[
          styles.text,
          {
            color: item.textColor,
          },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 44,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
