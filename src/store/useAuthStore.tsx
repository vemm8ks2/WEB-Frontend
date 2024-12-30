import { create } from "zustand";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface ResponseUser {
  username: string;
  role: "USER";
  gender: Gender;
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
  signin: (params: { username: string; password: string }) => Promise<boolean>;
  signup: (params: {
    username: string;
    password: string;
    birthDate?: string;
    gender?: Gender;
  }) => Promise<boolean>;
  signout: () => void;
}

export const useAuthStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  setToken: () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) set({ data: { token, refreshToken } });
  },
  signin: async ({ username, password }) => {
    set({ isLoading: true });

    let result = false;

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/auth/signin`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data: UserStore = await res.json();

      set({ data });

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      result = true;
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });

    return result;
  },
  signup: async ({ username, password, birthDate, gender }) => {
    set({ isLoading: true });

    let result = false;

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/auth/signup`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          ...(birthDate && { birthDate }),
          ...(gender ? { gender } : { gender: "OTHER" }),
        }),
      });

      if (res.status === 200) result = true;
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });

    return result;
  },
  signout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({ data: undefined });
  },
}));
