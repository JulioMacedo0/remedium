import { TOnboardingData } from "@/constants";
import { SharedValue } from "react-native-reanimated";
import { Dot } from "../Dot/Dot";
import { StyleSheet, View } from "react-native";

type PaginationProps = {
  data: TOnboardingData[];
  buttonVal: SharedValue<number>;
};

export const Pagination = ({ buttonVal, data }: PaginationProps) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => (
        <Dot index={index} buttonVal={buttonVal} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
  },
});
