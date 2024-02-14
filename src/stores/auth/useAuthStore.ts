import { client } from "@/services/http/httpClient";
import { create } from "zustand";
import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
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

type UserType = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  expo_token: string[];
};

interface UseAuthStoreType {
  accessToken: string;
  loading: boolean;
  authenticated: boolean;
  error: string;
  signIn: ({ email, password }: SignInRequest) => void;
  signUp: ({
    email,
    password,
    username,
  }: SignUpRequest) => Promise<number | undefined>;
}

export const useAuthStore = create<UseAuthStoreType>((set) => ({
  accessToken: "",
  loading: false,
  authenticated: false,
  error: "",
  signIn: async ({ email, password }) => {
    set((state) => ({ ...state, loading: true }));

    try {
      const signInResponse = await client.post<SignInResponse>("auth/signIn", {
        email,
        password,
      });

      storageService.setItem(STORAGE_KEYS.USER, signInResponse.data.user);
      storageService.setItem(
        STORAGE_KEYS.TOKEN,
        signInResponse.data.accessToken
      );

      set((state) => ({
        ...state,
        accessToken: signInResponse.data.accessToken,
        authenticated: true,
        loading: false,
      }));
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: error.response?.data.message,
        });
        set(() => ({ loading: false }));
      }

      set(() => ({ loading: false }));
    }
  },
  signUp: async ({ email, password, username }) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const expo_token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "0e830c18-6f43-4321-9330-c85a1c4acdb0",
        })
      ).data;

      console.log(expo_token);

      const signUpResponse = await client.post<SignUpResponse>("users", {
        email,
        password,
        username,
        expo_token,
      });

      Toast.show({
        type: "success",
        text1: `Account created with success! Welcome ${signUpResponse.data.username}`,
      });

      set(() => ({ loading: false }));
      return signUpResponse.status;
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: error.response?.data.message[0],
        });
        set(() => ({ loading: false }));
      }
      Toast.show({
        type: "error",
        text1: "Unknown error",
        text2: `${error}`,
      });
      console.log(error);
      set(() => ({ loading: false }));
    }
  },
}));
