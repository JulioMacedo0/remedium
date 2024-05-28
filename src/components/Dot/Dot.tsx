import { StyleSheet } from "react-native";

import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type DotProps = {
  index: number;
  buttonVal: SharedValue<number>;
};

export const Dot = ({ buttonVal, index }: DotProps) => {
  const animatedDot = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonVal.value,
      [0, 1, 2],
      ["#f8dac2", "#097969", "#5473C4"]
    );

    return {
      backgroundColor,
      width: buttonVal.value === index ? withSpring(20) : withSpring(10),
      opacity: buttonVal.value === index ? withSpring(1) : withSpring(0.5),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedDot]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 10,
    borderRadius: 999,
    marginHorizontal: 5,
  },
});
