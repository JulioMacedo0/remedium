import { client } from "@/services/http/httpClient";
import { create } from "zustand";
import { AxiosError, isAxiosError } from "axios";
type SignInRequest = {
  email: string;
  password: string;
};

type SignUpRequest = SignInRequest & {
  username: string;
};

type SignInResponse = {
  accessToken: string;
  user: User;
};

type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  expo_token: any[];
};

interface UseAuthStoreType {
  accessToken: string;
  loading: boolean;
  authenticated: boolean;
  error: string;
  signIn: ({ email, password }: SignInRequest) => void;
  signUp: ({ email, password, username }: SignUpRequest) => void;
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
        console.log(error.response?.data.message);
      }

      set(() => ({ loading: false }));
    }
  },
  signUp: ({ email, password, username }) => {
    set((state) => ({ ...state }));
  },
}));
