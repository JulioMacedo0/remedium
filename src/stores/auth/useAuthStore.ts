import { client } from "@/services/http/httpClient";
import { create } from "zustand";
import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

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
      const signUpResponse = await client.post<SignUpResponse>("users", {
        email,
        password,
        username,
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
      });
      set(() => ({ loading: false }));
    }
  },
}));
