import { CreateAlertType, TDayOfWeek } from "@/schema/alert-schema";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
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
import { Timer } from "./componets/timer";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

type AlertCardProps = {
  alert: CreateAlertType & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  index: number;
};

type Weeks = {
  name: string;
  value: TDayOfWeek;
};

export const AlertCard = ({ alert, index }: AlertCardProps) => {
  const theme = useTheme<Theme>();
  const { notificationCard } = theme.colors;
  const i18n = useI18nStore((state) => state.i18n);
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
    backgroundColor: notificationCard,
    borderRadius: 22,
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
      case "INTERVAL":
        return (
          <Text color="#fff" size="2xl" ml={10} mb={6}>
            Every {alert.trigger.hours.toString().padStart(2, "0")} hours -{" "}
            {alert.trigger.minutes.toString().padStart(2, "0")} minutes
          </Text>
        );

      default:
        return <Text>Teste</Text>;
    }
  };

  const weeks: Weeks[] = [
    { name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.MON"), value: TDayOfWeek.MONDAY },
    { name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.TUE"), value: TDayOfWeek.TUESDAY },
    {
      name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.WED"),
      value: TDayOfWeek.WEDNESDAY,
    },
    {
      name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.THU"),
      value: TDayOfWeek.THURSDAY,
    },
    { name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.FRI"), value: TDayOfWeek.FRIDAY },
    {
      name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.SAT"),
      value: TDayOfWeek.SATURDAY,
    },
    { name: i18n.t("FORMS.WEEKLY.WEEK_SELECT.SUN"), value: TDayOfWeek.SUNDAY },
  ];

  const renderFooterCard = () => {
    switch (alert.trigger.alertType) {
      case "WEEKLY":
        return (
          <HStack space="xs" ml={12} mt={6}>
            {weeks.map((weekValue) => (
              <WeekCard
                key={weekValue.name}
                weekName={weekValue.name}
                active={
                  !!alert.trigger.week.find((week) => week == weekValue.value)
                }
              />
            ))}
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
      case "INTERVAL":
        return (
          <Timer
            intervalHours={alert.trigger.hours}
            intervalMinutes={alert.trigger.minutes}
            lastNotification={
              alert.trigger.last_alert
                ? alert.trigger.last_alert
                : alert.createdAt
            }
          />
        );

      default:
        return <Text></Text>;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        router.push(`/edit-alert?id=${alert.id}`);
      }}
    >
      <Animated.View style={style}>
        <VStack alignItems="stretch">
          <HStack>
            <Heading color="#fff" size="sm" ml={12}>
              {alert.title}
            </Heading>
          </HStack>

          {renderTitleAlert()}
          {renderFooterCard()}
        </VStack>
      </Animated.View>
    </TouchableOpacity>
  );
};
