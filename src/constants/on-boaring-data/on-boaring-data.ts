import { AnimationObject } from "lottie-react-native";

export type TOnboardingData = {
  id: number;
  image: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
};

export const onBoaringData: TOnboardingData[] = [
  {
    id: 1,
    image: require("@lotties/preventive-health-care.json"),
    text: "Take your medicine correctly",
    textColor: "#f8dac2",
    backgroundColor: "#097969",
  },
  {
    id: 2,
    image: require("@lotties/email-marketing.json"),
    text: "Receive notifications",
    textColor: "#097969",
    backgroundColor: "#f8dac2",
  },
  {
    id: 3,
    image: require("@lotties/girl-doing-yoga.json"),
    text: "Take charge of your health",
    textColor: "#fff",
    backgroundColor: "#C4B454",
  },
];
