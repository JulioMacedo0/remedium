import { opacity } from "@shopify/restyle";
import { ArrowRight } from "lucide-react-native";
import { ComponentProps } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type OnboaringButtonProps = {
  buttonVal: SharedValue<number>;
} & ComponentProps<typeof Pressable>;

export const OnboaringButton = ({
  buttonVal,
  ...rest
}: OnboaringButtonProps) => {
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonVal.value,
      [0, 1, 2],
      ["#f8dac2", "#097969", "#5473C4"]
    );

    return {
      backgroundColor,
    };
  });

  const buttomAnimationStyle = useAnimatedStyle(() => {
    return {
      width: buttonVal.value === 2 ? withSpring(260) : withSpring(120),
      height: buttonVal.value === 2 ? withSpring(80) : withSpring(120),
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        buttonVal.value == 2
          ? withTiming(0, { duration: 1000 })
          : withTiming(1),
      transform: [
        {
          translateX:
            buttonVal.value == 2
              ? withTiming(100, { duration: 1000 })
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        buttonVal.value == 2
          ? withTiming(1, { duration: 1000 })
          : withTiming(0),
      transform: [
        {
          translateX:
            buttonVal.value == 2
              ? withTiming(0, { duration: 1000 })
              : withTiming(-100),
        },
      ],
    };
  });

  const AnimatedArrowRight = Animated.createAnimatedComponent(ArrowRight);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      style={[styles.container, animatedColor, buttomAnimationStyle]}
      {...rest}
    >
      <Animated.Text style={[styles.textButton, textAnimationStyle]}>
        Get Started
      </Animated.Text>
      <AnimatedArrowRight
        style={arrowAnimationStyle}
        width={45}
        height={45}
        color={"#000"}
      />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    bottom: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
    position: "absolute",
  },
});
