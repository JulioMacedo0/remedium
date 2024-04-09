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

    const timeleft = timeInterval - differenceInSeconds(now, nextTrigger);
    setTimeLeft(timeleft.toString());
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
      Next notification in {timeLeft}s
    </Text>
  );
};
