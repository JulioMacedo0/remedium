import { OnboaringItem } from "@/components";
import { OnboaringButton } from "@/components/OnboaringButton/OnboaringButton";
import { Pagination } from "@/components/Pagination/Pagination";
import { onBoaringData } from "@/constants";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { View, StyleSheet, PixelRatio, Text } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import {
  Canvas,
  SkImage,
  makeImageFromView,
  Image,
} from "@shopify/react-native-skia";
export default function Onboaring() {
  const pd = PixelRatio.get();
  const buttonVal = useSharedValue(0);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const wait = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [overlay, setOverlay] = useState<SkImage | null>(null);

  const handlePress = async () => {
    if (currentIndex == onBoaringData.length - 1) {
      storageService.setItem(STORAGE_KEYS.VIEWONBOARING, "true");
      router.replace("/sign-in");
      return;
    }
    const snapshot = await makeImageFromView(ref);
    setOverlay(snapshot);
    wait(80);
    setCurrentIndex((pervIndex) => pervIndex + 1);
    buttonVal.value = withTiming(buttonVal.value + 1);
  };

  return (
    <View style={[style.container]}>
      <View ref={ref} collapsable={false}>
        {onBoaringData.map((item, index) => {
          return (
            currentIndex == index && <OnboaringItem item={item} key={index} />
          );
        })}
      </View>
      {overlay && (
        <Canvas style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <Image
            image={overlay}
            x={0}
            y={0}
            width={overlay.width() / pd}
            height={overlay.height() / pd}
          />
        </Canvas>
      )}
      <Pagination data={onBoaringData} buttonVal={buttonVal} />
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
  pagination: {
    position: "absolute",
  },
});
