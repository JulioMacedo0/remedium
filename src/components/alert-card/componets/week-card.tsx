import { View, Text } from "@gluestack-ui/themed";

type WeekCardProps = {
  weekName: string;
  active: boolean;
};
export const WeekCard = ({ weekName, active }: WeekCardProps) => {
  return (
    <View
      p={4}
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
      bgColor={active ? "#008000" : "#1222"}
      px={4}
      py={12}
    >
      <Text color="#fff">{weekName}</Text>
    </View>
  );
};
