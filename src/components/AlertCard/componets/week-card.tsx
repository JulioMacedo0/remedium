import { Theme } from "@/constants";
import { useAlertStore } from "@/stores/alert/use-alert-store";
import { View, Text } from "@gluestack-ui/themed";
import { useTheme } from "@shopify/restyle";

type WeekCardProps = {
  weekName: string;
  active: boolean;
};
export const WeekCard = ({ weekName, active }: WeekCardProps) => {
  const theme = useTheme<Theme>();
  const { brandColor } = theme.colors;
  const { loading } = useAlertStore((set) => set);
  const brandC = loading ? brandColor + 40 : brandColor;
  return (
    <View
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
      bgColor={active ? brandC : "#1222"}
      p={7}
    >
      <Text color="#fff">{weekName}</Text>
    </View>
  );
};
