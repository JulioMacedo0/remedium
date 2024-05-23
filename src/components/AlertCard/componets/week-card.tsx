import { Theme } from "@/constants";
import { View, Text } from "@gluestack-ui/themed";
import { useTheme } from "@shopify/restyle";

type WeekCardProps = {
  weekName: string;
  active: boolean;
};
export const WeekCard = ({ weekName, active }: WeekCardProps) => {
  const theme = useTheme<Theme>();
  const { brandColor } = theme.colors;
  return (
    <View
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
      bgColor={active ? brandColor : "#1222"}
      p={7}
    >
      <Text color="#fff">{weekName}</Text>
    </View>
  );
};
