import { useTheme } from "@/context";
import {
  CreateAlertResponse,
  useAlertStore,
} from "@/stores/alert/userAlertStore";
import { View, Heading, HStack, Icon } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pill, Trash2Icon } from "lucide-react-native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type AlertCardProps = {
  alert: CreateAlertResponse;
  index: number;
};

export type weeksValues = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const AlertCard = ({ alert, index }: AlertCardProps) => {
  const router = useRouter();

  const fade = useSharedValue(0);
  const scale = useSharedValue(0);
  const height = useSharedValue(55);
  const padding = useSharedValue(12);
  const mb = useSharedValue(8);

  useEffect(() => {
    fade.value = withDelay(index * 120, withTiming(1));
    scale.value = withDelay(index * 120, withTiming(1));
  }, []);

  const animatedToRemove = () => {
    scale.value = withTiming(0);
    height.value = withTiming(0);
    padding.value = withTiming(0);
    mb.value = withTiming(0);
    fade.value = withTiming(0);
  };

  const animatedToAdd = () => {
    scale.value = withTiming(1);
    height.value = withTiming(1);
    padding.value = withTiming(12);
    mb.value = withTiming(8);
    fade.value = withTiming(1);
  };

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: fade.value,
    height: height.value,
    padding: padding.value,
    backgroundColor: "#b6a3f5",
    borderRadius: 12,
    marginBottom: mb.value,
  }));

  const iconContainer = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  const { deleteAlert } = useAlertStore((set) => set);

  return (
    <Animated.View style={style}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          router.push(`/edit-alert?id=${alert.id}`);
        }}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Animated.View style={iconContainer}>
            <Icon as={Pill} color="#fff" size="lg" />
          </Animated.View>

          <Heading color="#fff">{alert.title}</Heading>

          <View>
            <HStack space="sm">
              <TouchableOpacity
                onPress={async () => {
                  try {
                    animatedToRemove();
                    await deleteAlert(alert.id);
                  } catch (error) {
                    animatedToAdd();
                  }
                }}
              >
                <Animated.View style={iconContainer}>
                  <Icon as={Trash2Icon} color="$red600" size="lg" />
                </Animated.View>
              </TouchableOpacity>
            </HStack>
          </View>
        </HStack>
      </TouchableOpacity>
    </Animated.View>
  );
};
