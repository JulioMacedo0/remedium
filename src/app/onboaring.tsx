import { OnboaringItem } from "@/components";
import { OnboaringButton } from "@/components/OnboaringButton/OnboaringButton";
import { onBoaringData } from "@/constants";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

export default function Onboaring() {
  const buttonVal = useSharedValue(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePress = () => {
    if (currentIndex == onBoaringData.length - 1) {
      return;
    }

    setCurrentIndex((pervIndex) => pervIndex + 1);
    buttonVal.value = withTiming(buttonVal.value + 1);
  };

  return (
    <View style={[style.container]}>
      <View>
        {onBoaringData.map((item, index) => {
          return (
            currentIndex == index && <OnboaringItem item={item} key={index} />
          );
        })}
      </View>
      <OnboaringButton onPress={() => handlePress()} buttonVal={buttonVal} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
