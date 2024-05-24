import { ArrowRight } from "lucide-react-native";
import { ComponentProps } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type OnboaringButtonProps = {
  buttonVal: SharedValue<number>;
} & ComponentProps<typeof TouchableWithoutFeedback>;

export const OnboaringButton = ({
  buttonVal,
  ...rest
}: OnboaringButtonProps) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonVal.value,
      [0, 1, 2],
      ["#f8dac2", " #097969", "#fff"]
    );

    return {
      backgroundColor,
    };
  });
  return (
    <TouchableWithoutFeedback {...rest}>
      <Animated.View style={[styles.container, animatedColor]}>
        <ArrowRight width={45} height={45} color={"#000"} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    bottom: 100,
    height: 120,
    width: 120,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
