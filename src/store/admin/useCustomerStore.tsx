import { create } from "zustand";

import type { ApiResponse, Page } from "@/types/api";
import type { User } from "@/types/user";

interface State {
  data?: Page<User>;
  isLoading: boolean;
  getCustomer: (params: {
    token: string;
    page?: number;
    size?: number;
  }) => void;
}

export const useCustomerStore = create<State>((set) => ({
  data: undefined,
  isLoading: false,
  getCustomer: async ({ token, page = 0, size = 10 }) => {
    set({ isLoading: true });

    try {
      const currPage = page >= 0 ? page : 0;
      const currSize = size > 0 ? size : 10;

      const endpoint = `${
        import.meta.env.VITE_API_URL
      }/admin/user?page=${currPage}&size=${currSize}`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data }: ApiResponse<Page<User>> = await res.json();

      set({ data });
    } catch (e) {
      console.error(e);
    }

    set({ isLoading: false });
  },
}));
