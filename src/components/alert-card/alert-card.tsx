import { CreateAlertType } from "@/schema/alert-schema";
import { useAlertStore } from "@/stores/alert/userAlertStore";
import { View, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { format } from "date-fns";
import { useRouter } from "expo-router";

import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { WeekCard } from "./componets/week-card";

type AlertCardProps = {
  alert: CreateAlertType & { id: string };
  index: number;
};

export const AlertCard = ({ alert, index }: AlertCardProps) => {
  const router = useRouter();

  const fade = useSharedValue(0);
  const scale = useSharedValue(0);
  const height = useSharedValue(135);
  const padding = useSharedValue(8);
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
    height.value = withTiming(55);
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

  const renderTitleAlert = () => {
    switch (alert.trigger.alertType) {
      case "WEEKLY":
        return (
          <Text color="#fff" size="2xl" ml={10} mb={6}>
            {format(alert.trigger.date, "p")}
          </Text>
        );

      case "DAILY":
        return (
          <Text color="#fff" size="2xl" ml={10} mb={6}>
            {format(alert.trigger.date, "p")}
          </Text>
        );
      case "DATE":
        return (
          <Text color="#fff" size="2xl" ml={10} mb={6}>
            {format(alert.trigger.date, "Pp")}
          </Text>
        );

      default:
        return <Text>Teste</Text>;
        break;
    }
  };

  const renderFooterCard = () => {
    switch (alert.trigger.alertType) {
      case "WEEKLY":
        return (
          <HStack alignItems="center">
            <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
              Every Week
            </Text>

            <HStack space="md">
              <WeekCard
                weekName="Mon"
                active={!!alert.trigger.week.find((week) => week == "MONDAY")}
              />
              <WeekCard
                weekName="Tue"
                active={!!alert.trigger.week.find((week) => week == "TUESDAY")}
              />
              <WeekCard
                weekName="Wed"
                active={
                  !!alert.trigger.week.find((week) => week == "WEDNESDAY")
                }
              />
              <WeekCard
                weekName="Fri"
                active={!!alert.trigger.week.find((week) => week == "FRIDAY")}
              />
              <WeekCard
                weekName="Sat"
                active={!!alert.trigger.week.find((week) => week == "SATURDAY")}
              />
              <WeekCard
                weekName="sun"
                active={!!alert.trigger.week.find((week) => week == "SUNDAY")}
              />
            </HStack>
          </HStack>
        );
      case "DAILY":
        return (
          <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
            Every Day
          </Text>
        );
      case "DATE":
        return (
          <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
            One day
          </Text>
        );

      default:
        return <Text></Text>;
        break;
    }
  };

  return (
    <Animated.View style={style}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          router.push(`/edit-alert?id=${alert.id}`);
        }}
      >
        <VStack alignItems="stretch">
          <Heading color="#fff" size="sm">
            {alert.title}
          </Heading>

          {renderTitleAlert()}
          {renderFooterCard()}
          <View>
            {/* <HStack space="sm">
              <TouchableOpacity
                onPress={async () => {
                  try {
                    animatedToRemove();
                    await deleteAlert(alert.id);
                  } catch (error) {
                    Toast.show({
                      type: "error",
                      text1: `${error}`,
                    });
                    animatedToAdd();
                  }
                }}
              >
                <Animated.View style={iconContainer}>
                  <Icon as={Trash2Icon} color="$red600" size="lg" />
                </Animated.View>
              </TouchableOpacity>
            </HStack> */}
          </View>
        </VStack>
      </TouchableOpacity>
    </Animated.View>
  );
};
