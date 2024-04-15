import { Text } from "@gluestack-ui/themed";
import {
  addHours,
  addMinutes,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";

type TimerComponentProps = {
  lastNotification: Date;
  intervalHours: number;
  intervalMinutes: number;
};

export const Timer = ({
  lastNotification,
  intervalHours,
  intervalMinutes,
}: TimerComponentProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  const timeInterval = intervalMinutes * 60 + intervalHours * 3600;

  const calculateTimeLeft = () => {
    const now = new Date();
    const diferrentHours = differenceInHours(now, lastNotification);
    const diferrentMinutes = differenceInMinutes(now, lastNotification);
    const nextTrigger = addMinutes(
      addHours(lastNotification, diferrentHours),
      diferrentMinutes
    );

    const timeleftInSeconds =
      timeInterval - differenceInSeconds(now, nextTrigger);
    const hoursLeft = Math.floor(timeleftInSeconds / 3600);
    const minutesLeft = Math.floor((timeleftInSeconds % 3600) / 60);
    const secondsLeft = timeleftInSeconds % 60;

    setTimeLeft(
      `${hoursLeft.toString().padStart(2, "0")}h ${minutesLeft
        .toString()
        .padStart(2, "0")}m ${secondsLeft.toString().padStart(2, "0")}s`
    );
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [lastNotification, intervalHours, intervalMinutes]);

  return (
    <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
      Take it again in {timeLeft}
    </Text>
  );
};
