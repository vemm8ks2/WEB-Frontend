import { create } from "zustand";

import type { ApiResponse } from "@/types/api";

interface State {
  isLoading: boolean;
  checkAdmin: (params: { token: string }) => Promise<boolean>;
}

export const useAdminValidateStore = create<State>((set) => ({
  isLoading: false,
  checkAdmin: async ({ token }) => {
    set({ isLoading: true });

    let result = false;

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/admin/validate`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const { data }: ApiResponse<{ result: boolean }> = await res.json();
        result = data.result;
      }
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });

    return result;
  },
}));
