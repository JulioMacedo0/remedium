import { create } from "zustand";
interface useAlertTypeStoreType {
  alertType: string;
  changeAlertType: (value: string) => void;
}

export const useAlertTypeStore = create<useAlertTypeStoreType>((set) => ({
  alertType: "",
  changeAlertType: (value) => {
    set((state) => ({ ...state, alertType: value }));
  },
}));
