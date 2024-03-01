import { AxiosError, isAxiosError } from "axios";
import { create } from "zustand";
import Toast from "react-native-toast-message";
import { client } from "@/services/http/httpClient";
import { CreateAlertType } from "@/schema";
import { router } from "expo-router";
import { Try } from "expo-router/build/views/Try";
type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

// type MedicineType = {
//   id: string;
//   name: string;
//   quantity: number;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

export type CreateAlertResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  trigger: {
    id: string;
    alertId: string;
  };
} & CreateAlertType;

const DayOfWeek = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
} as const;

type userAlertStoreType = {
  alerts: CreateAlertResponse[];
  loading: boolean;
  getAlerts: () => void;
  createAlerts: (alert: CreateAlertType, succesCallBack: () => void) => void;
  updateAlerts: (
    alert: CreateAlertType,
    succesCallBack: () => void,
    alertId: string
  ) => void;
  deleteAlert: (alertId: string) => void;
};

export const useAlertStore = create<userAlertStoreType>((set) => ({
  alerts: [],
  loading: false,
  getAlerts: async () => {
    try {
      set((state) => ({ ...state, loading: true }));
      const alertsResponse = await client.get<CreateAlertResponse[]>("alerts");

      set((state) => ({
        ...state,
        alerts: alertsResponse.data,
        loading: false,
      }));
    } catch (error) {
      if (isAxiosError(error)) {
        // Toast.show({
        //   type: "error",
        //   text1: error.response?.data.message,
        // });
      }

      set((state) => ({ ...state, loading: false }));
    }
    set((state) => ({ ...state, loading: false }));
  },
  createAlerts: async (alert, callBack) => {
    try {
      set((state) => ({ ...state, loading: true }));
      const createAlertResponse = await client.post<CreateAlertResponse>(
        "alerts",
        alert
      );

      callBack();
      Toast.show({
        type: "success",
        text1: `Alert created`,
      });
      set((state) => ({
        ...state,
        alerts: [...state.alerts, createAlertResponse.data],
        loading: false,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        Toast.show({
          type: "error",
          text1: `${error.response?.data?.message}`,
        });
      }
      set((state) => ({ ...state, loading: false }));
    }
  },
  updateAlerts: async (alert, callBack, alertId) => {
    try {
      set((state) => ({ ...state, loading: true }));
      const updateAlertResponse = await client.patch<CreateAlertResponse>(
        `alerts/${alertId}`,
        alert
      );

      callBack();
      router.back();
      Toast.show({
        type: "success",
        text1: `Alert updated`,
      });
      set((state) => ({
        ...state,
        alerts: [
          ...state.alerts.map((alert) => {
            if (alert.id == updateAlertResponse.data.id) {
              return updateAlertResponse.data;
            } else {
              return alert;
            }
          }),
        ],
        loading: false,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        Toast.show({
          type: "error",
          text1: `${error.response?.data?.message}`,
        });
      }
    }
  },
  deleteAlert: async (alertId) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const deleteAlertResponse = await client.delete<
        Omit<CreateAlertResponse, "trigger">
      >(`alerts/${alertId}`);

      Toast.show({
        type: "success",
        text1: `Alert deleted`,
      });

      set((state) => ({
        ...state,
        alerts: [
          ...state.alerts.filter(
            (alert) => alert.id != deleteAlertResponse.data.id
          ),
        ],
        loading: false,
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        Toast.show({
          type: "error",
          text1: `${error.response?.data?.message}`,
        });
      }
    }
  },
}));
