import { isAxiosError } from "axios";
import { create } from "zustand";
import Toast from "react-native-toast-message";
import { client } from "@/services/http/httpClient";
type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

type MedicineType = {
  id: string;
  name: string;
  quantity: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type TriggerType = {
  id: string;
  type: string;
  alertId: string;
  date: Date;
  last_alert: string;
  hours: number;
  minutes: number;
  seconds: number;
  week: DayOfWeek[];
  repeats: boolean;
};

type AlertType = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  unit_of_measurement: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  medicine_id: string;
};

export type AlertResponse = AlertType & {
  trigger: TriggerType;
  medicine: MedicineType;
};

type AlertRequest = {};

type userAlertStoreType = {
  alerts: AlertResponse[];
  loading: boolean;
  getAlerts: () => void;
};

export const useAlertStore = create<userAlertStoreType>((set) => ({
  alerts: [],
  loading: false,
  getAlerts: async () => {
    set((state) => ({ ...state, loading: true }));

    try {
      const alertsResponse = await client.get<AlertResponse[]>("alerts");

      set((state) => ({
        ...state,
        alerts: alertsResponse.data,
        loading: false,
      }));
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: error.response?.data.message,
        });
      }

      set(() => ({ loading: false }));
    }
  },
}));
