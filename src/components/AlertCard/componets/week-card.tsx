import { View, Text } from "@gluestack-ui/themed";

type WeekCardProps = {
  weekName: string;
  active: boolean;
};
export const WeekCard = ({ weekName, active }: WeekCardProps) => {
  return (
    <View
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
      bgColor={active ? "#008000" : "#1222"}
      px={4}
    >
      <Text color="#fff">{weekName}</Text>
    </View>
  );
};
