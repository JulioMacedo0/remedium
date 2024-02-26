import { useTheme } from "@/context";
import { CreateAlertResponse } from "@/stores/alert/userAlertStore";
import { Text, View, Heading, HStack, Icon } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pill, FilePenLine } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
type AlertCardProps = {
  alert: CreateAlertResponse;
};

export type weeksValues = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const AlertCard = ({ alert }: AlertCardProps) => {
  const router = useRouter();
  return (
    <View bgColor="#b6a3f5" p={12} rounded="$lg">
      <HStack alignItems="center" justifyContent="space-between">
        <Icon as={Pill} color="#fff" size="lg" />
        <Heading color="#fff">{alert.title}</Heading>
        <TouchableOpacity
          onPress={() => {
            router.push(`/edit-alert?id=${alert.id}`);
          }}
        >
          <Icon as={FilePenLine} color="#fff" size="lg" />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};
