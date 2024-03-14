import { useTheme } from "@/context";
import {
  CreateAlertResponse,
  useAlertStore,
} from "@/stores/alert/userAlertStore";
import { Text, View, Heading, HStack, Icon } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pill, FilePenLine, Trash2Icon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
type AlertCardProps = {
  alert: CreateAlertResponse;
};

export type weeksValues = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const AlertCard = ({ alert }: AlertCardProps) => {
  const router = useRouter();

  const { deleteAlert } = useAlertStore((set) => set);
  return (
    <View bgColor="#b6a3f5" p={12} rounded="$lg">
      <TouchableOpacity
        onPress={() => {
          router.push(`/edit-alert?id=${alert.id}`);
        }}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Icon as={Pill} color="#fff" size="lg" />
          <Heading color="#fff">{alert.title}</Heading>

          <View>
            <HStack space="sm">
              <TouchableOpacity
                onPress={async () => {
                  await deleteAlert(alert.id);
                }}
              >
                <Icon as={Trash2Icon} color="$red400" size="lg" />
              </TouchableOpacity>
            </HStack>
          </View>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
