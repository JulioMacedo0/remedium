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

  useEffect(() => {
    fade.value = withDelay(index * 120, withTiming(1));
    scale.value = withDelay(index * 120, withTiming(1));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: fade.value,
  }));

  const { deleteAlert } = useAlertStore((set) => set);
  return (
    <Animated.View style={style}>
      <View bgColor="#b6a3f5" p={12} rounded="$lg">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            router.push(`/edit-alert?id=${alert.id}`);
          }}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Icon as={Pill} color="#fff" size="lg" />
            <Heading color="#fff">{alert.title}</Heading>

            <View>
              <HStack space="sm">
                <TouchableOpacity
                  onPress={async () => {
                    await deleteAlert(alert.id);
                  }}
                >
                  <Icon as={Trash2Icon} color="$red400" size="lg" />
                </TouchableOpacity>
              </HStack>
            </View>
          </HStack>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
