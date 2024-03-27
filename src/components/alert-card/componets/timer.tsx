import { Text } from "@gluestack-ui/themed";
import {
  addHours,
  addMinutes,
  differenceInMilliseconds,
  formatDistanceToNow,
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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextNotification = addHours(
        addMinutes(lastNotification, intervalMinutes),
        intervalHours
      );

      const differenceMilliseconds = differenceInMilliseconds(
        nextNotification,
        now
      );
      console.log(differenceMilliseconds);
      if (differenceMilliseconds > 0) {
        const hours = Math.floor(differenceMilliseconds / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor(
          (differenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor(
          (differenceMilliseconds % (1000 * 60)) / 1000
        )
          .toString()
          .padStart(2, "0");

        setTimeLeft(`${hours}:${minutes}:${seconds}`);

        const timer = setTimeout(calculateTimeLeft, 1000);

        // Limpa o timer quando o componente é desmontado
        return () => clearTimeout(timer);
      } else {
        setTimeLeft("00:00:00");
      }
    };

    calculateTimeLeft();
  }, [lastNotification, intervalHours, intervalMinutes]);

  return (
    <Text color="#fff" fontWeight="$bold" ml={10} mr={8}>
      Next notification in {timeLeft}
    </Text>
  );
};
