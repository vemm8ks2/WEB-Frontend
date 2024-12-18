import { create } from "zustand";

export interface ResponseUser {
  username: string;
  role: "USER";
  gender: "MALE" | "FEMALE" | "OTHERS";
  birthDate: string | null;
}

type UserStore = {
  token: string;
  refreshToken: string;
};

interface State {
  data?: UserStore;
  isLoading: boolean;
  setToken: () => void;
  signin: (params: { username: string; password: string }) => void;
  signout: () => void;
}

export const useAuthStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  setToken: () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) set({ data: { token: token, refreshToken } });
  },
  signin: async ({ username, password }) => {
    set({ isLoading: true });

    try {
      const res = await fetch("http://localhost:5454/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data: UserStore = await res.json();

      set({ data });

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
  signout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({ data: undefined });
  },
}));
