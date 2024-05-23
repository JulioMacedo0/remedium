import { client } from "@/services/http/httpClient";
import { create } from "zustand";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import * as Localization from "expo-localization";
type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken: string;
  user: UserType;
};

type SignUpRequest = SignInRequest & {
  username: string;
};

type SignUpResponse = UserType;

export type UserType = {
  id: string;
  username: string;
  email: string;
  languageTag: String;
  timeZone: String;
  createdAt: Date;
  updatedAt: Date;
  expo_token: string;
};

interface UseAuthStoreType {
  loading: boolean;
  authenticated: boolean;
  authenticating: boolean;
  error: string;
  setAuthenticated: (value: boolean) => void;
  setAuthenticating: (value: boolean) => void;
  signIn: (
    { email, password }: SignInRequest,
    succesCallBack: () => void
  ) => void;
  signUp: (
    { email, password, username }: SignUpRequest,
    succesCallBack: () => void
  ) => Promise<number | undefined>;
  logout: () => Promise<void>;
  updateExpoToken: () => Promise<void>;
}

export const useAuthStore = create<UseAuthStoreType>((set) => ({
  authenticating: true,
  loading: false,
  authenticated: false,
  error: "",
  logout: async () => {
    storageService.removeItem(STORAGE_KEYS.TOKEN);
    storageService.removeItem(STORAGE_KEYS.USER);
    set((state) => ({ ...state, authenticated: false }));
  },
  setAuthenticated: (value) => {
    set((state) => ({ ...state, authenticated: value }));
  },
  setAuthenticating: (value) => {
    set((state) => ({ ...state, authenticating: value }));
  },
  signIn: async ({ email, password }, succesCallBack) => {
    set((state) => ({ ...state, loading: true }));

    const signInResponse = await client
      .post<SignInResponse>("auth/signIn", {
        email,
        password,
      })
      .finally(() => {
        set((state) => ({ ...state, loading: false }));
      });

    storageService.setItem(STORAGE_KEYS.USER, signInResponse.data.user);
    storageService.setItem(STORAGE_KEYS.TOKEN, signInResponse.data.accessToken);
    succesCallBack();
    set((state) => ({
      ...state,
      authenticated: true,
      loading: false,
    }));
  },
  signUp: async ({ email, password, username }, succesCallBack) => {
    set((state) => ({ ...state, loading: true }));

    const { languageTag } = Localization.getLocales()[0];
    const { timeZone } = Localization.getCalendars()[0];

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }
    const expo_token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    const signUpResponse = await client
      .post<SignUpResponse>("users", {
        email,
        password,
        username,
        expo_token,
        timeZone,
        languageTag,
      })
      .finally(() => {
        set((state) => ({ ...state, loading: false }));
      });

    Toast.show({
      type: "success",
      text1: `Account created with success!`,
    });
    succesCallBack();

    return signUpResponse.status;
  },
  updateExpoToken: async () => {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }
    const expo_token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    const user = storageService.getItem<UserType>(STORAGE_KEYS.USER);

    if (expo_token == user?.expo_token) return;

    const signUpResponse = await client.patch<SignUpResponse>("users", {
      expo_token,
    });

    storageService.setItem(STORAGE_KEYS.USER, signUpResponse.data);
  },
}));
